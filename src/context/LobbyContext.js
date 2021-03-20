import {
  useContext,
  createContext
} from 'react'

import { maxBy } from 'lodash'

import onPlayCard from 'context/utils/onPlayCard'
import canPlaySuite from 'context/utils/canPlaySuite'
import bot from 'context/utils/bot'

import database from 'utils/firebase'
import rotate from 'utils/rotate'

const myPlayerID = window.localStorage.getItem('playerID')

export const LobbyContext = createContext()

const assignedSeats = {
  1: [0],
  2: [0, 6],
  3: [0, 3, 9],
  4: [0, 3, 6, 9],
  5: [0, 3, 6, 8, 10],
  6: [0, 2, 4, 6, 8, 10],
  7: [0, 2, 4, 6, 8, 9, 10],
  8: [0, 2, 3, 4, 6, 8, 9, 10],
  9: [0, 1, 2, 3, 4, 6, 8, 9, 10],
  10: [0, 1, 2, 3, 4, 5, 6, 8, 9, 10],
  11: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  12: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
}

const positions = [
  [{ bottom: '-23.5px' }, { top: '361.5px' }, { x: 0, y: 230 }],
  [{ left: '0px', bottom: '25px' }, { left: '40px', top: '330px' }, { x: -90, y: 185 }],
  [{ left: '-22.75px', bottom: '115px' }, { left: '35px', top: '260px' }, { x: -115, y: 100 }],
  [{ left: '-22.75px', bottom: '204px' }, { left: '35px', top: '190px' }, { x: -115, y: -0 }],
  [{ left: '-22.75px', bottom: '293px' }, { left: '35px', top: '120px' }, { x: -115, y: -100 }],
  [{ left: '0px', bottom: '383px' }, { left: '40px', top: '50px' }, { x: -90, y: -185 }],
  [{ top: '-23.5px' }, { top: '18.5px' }, { x: 0, y: -230 }],
  [{ right: '0px', bottom: '383px' }, { right: '40px', top: '50px' }, { x: 90, y: -185 }],
  [{ right: '-22.75px', bottom: '293px' }, { right: '35px', top: '120px' }, { x: 115, y: -100 }],
  [{ right: '-22.75px', bottom: '204px' }, { right: '35px', top: '190px' }, { x: 115, y: -0 }],
  [{ right: '-22.75px', bottom: '115px' }, { right: '35px', top: '260px' }, { x: 115, y: 100 }],
  [{ right: '0px', bottom: '25px' }, { right: '40px', top: '330px' }, { x: 90, y: 185 }]
]

export const LobbyProvider = ({ value, children }) => {
  return (
    <LobbyContext.Provider value={value}>
      {children}
    </LobbyContext.Provider>
  )
}

export const useLobby = () => {
  const lobby = useContext(LobbyContext)

  if (lobby === undefined) {
    return { table: { state: 'NOT_READY' } }
  }

  // host
  lobby.amIHost = () => {
    return lobby.settings.host.playerID === myPlayerID
  }

  lobby.isPlayerHost = (playerID) => {
    return lobby.settings.host.playerID === playerID
  }

  lobby.getHost = () => {
    return lobby.players[lobby.settings.host.playerID]
  }

  lobby.isHostOnline = () => {
    return !lobby.settings.host.lastOnline
  }

  lobby.isPlayerOnline = (playerID) => {
    return !lobby.players[playerID].lastOnline
  }

  lobby.findNewHost = () => {
    const currentHostID = lobby.getHost()
    return lobby.getAllPlayers().find(({ playerID, lastOnline }) => playerID !== currentHostID && !lastOnline)
  }

  lobby.setNewHost = async (playerID) => {
    lobby.settings.host = {
      playerID,
      lastOnline: null
    }
    await database().ref(`${lobby.settings.name}/settings/host`).update({
      playerID,
      lastOnline: null
    })
  }

  // players
  lobby.getAllPlayers = () => {
    // we check if the player has a nickname to avoid getting players not in room.
    // Firebase sets player's lastOnline on disconnect - but if the player leaves the room and on quick refresh,
    // the player will be added again by the usePlayerDisconnect hook with just the lastOnline value.
    // We simply ignore players who don't have a nickname set (aka; they only have lastOnline)
    return lobby.getPlayerSeatings()
      .map(playerID => lobby.players[playerID])
      .filter(({ nickname }) => nickname)
  }

  lobby.getAllPlayersWithCards = () => {
    return lobby.getAllPlayers().filter(lobby.doesPlayerHaveCards)
  }

  lobby.getNextPlayerIDWithCards = () => {
    const allPlayers = lobby.getAllPlayers()
    const currentPlayerIndex = allPlayers.findIndex(player => player.playerID === lobby.table.turn)
    let nextPlayerIndexIncrement = 1
    const nextPlayerIndex = (currentPlayerIndex + nextPlayerIndexIncrement) % allPlayers.length
    let nextPlayer = allPlayers[nextPlayerIndex]
    while (!lobby.doesPlayerHaveCards(nextPlayer)) {
      // keep finding the next player with cards
      nextPlayerIndexIncrement += 1
      const nextPlayerIndex = (currentPlayerIndex + nextPlayerIndexIncrement) % allPlayers.length
      nextPlayer = allPlayers[nextPlayerIndex]
    }
    return nextPlayer.playerID
  }

  lobby.countAllPlayersWithCards = () => {
    return lobby.getAllPlayersWithCards().length
  }

  lobby.doesPlayerHaveCards = (player) => {
    return lobby.getAllCards().some(card => card.playerID === player.playerID && card.holder === 'PLAYER')
  }

  lobby.countAllPlayers = () => {
    return lobby.getAllPlayers().length
  }

  lobby.getPlayer = (playerID) => {
    return lobby.players[playerID]
  }

  lobby.getMyself = () => {
    return lobby.players[myPlayerID]
  }

  lobby.setMaxPlayers = async (count) => {
    lobby.settings.maxPlayers = count
    await database().ref(`${lobby.settings.name}/settings/maxPlayers`).set(count)
  }

  lobby.getPlayerSeatings = () => {
    return Object.values(lobby.table.seatings)
  }

  lobby.getSeatingsWRTMyself = () => {
    // get the current seating order of players
    const playerIDs = lobby.getPlayerSeatings()
    // find my seating position
    const mySeatingIndex = playerIDs.findIndex(playerID => playerID === myPlayerID)
    // rotate the seating positions until I am at the beginning (6 o clock)
    if (mySeatingIndex > 0) rotate(playerIDs, mySeatingIndex)
    return playerIDs
  }

  lobby.getPlayerPositions = (playerID) => {
    // find playerID's idx from seatings
    const seatings = lobby.getSeatingsWRTMyself()
    const playerIDIdx = seatings.findIndex(ID => ID === playerID)
    const allPlayerSeatings = assignedSeats[lobby.countAllPlayers()]
    const playerSeatingPositionIdx = allPlayerSeatings[playerIDIdx]
    const [avatarPos, cardPos, dealingPos] = positions[playerSeatingPositionIdx]
    return { avatarPos, cardPos, dealingPos }
  }

  lobby.dealPlayerCard = async (playerIndex, card) => {
    // deal the card to the player sitting at playerIndex position
    const playerID = lobby.getPlayerSeatings()[playerIndex]
    lobby.table.lastDealtPlayer = playerID
    await database().ref(`${lobby.settings.name}/table/lastDealtPlayer`).set(playerID)
    if (!lobby.table.cards) lobby.table.cards = {}
    lobby.table.cards[card.cardID] = {
      ...card,
      playerID,
      holder: 'PLAYER'
    }
    await database().ref(`${lobby.settings.name}/table/cards/${card.cardID}`).set({
      ...card,
      playerID,
      holder: 'PLAYER'
    })
    if (card.cardID === '14-of-spades') {
      // set the turn to the player who got Ace of Spades
      lobby.table.turn = playerID
      lobby.table.time = 0
      await database().ref(`${lobby.settings.name}/table`).update({
        turn: playerID,
        time: 0
      })
    }
  }

  // cards
  lobby.getAllCards = () => {
    return Object.values(lobby.table.cards || {})
  }

  lobby.countAllCards = () => {
    return lobby.getAllCards().length
  }

  lobby.getPlayerCards = (playerID) => {
    return lobby.getAllCards().filter(card => card.playerID === playerID && card.holder === 'PLAYER')
  }

  lobby.getMyCards = () => {
    return lobby.getAllCards().filter(card => card.playerID === myPlayerID && card.holder === 'PLAYER')
  }

  lobby.countPlayerCards = (playerID) => {
    return lobby.getPlayerCards(playerID).length
  }

  lobby.hasDiscard = () => {
    return !lobby.table.gotCut && lobby.getAllCards().some(({ holder }) => holder === 'DISCARD')
  }

  lobby.getTableCards = () => {
    return lobby.getAllCards().filter(({ holder }) => holder === 'TABLE')
  }

  lobby.countTableCards = () => {
    return lobby.getTableCards().length
  }

  // game
  lobby.startDealing = async () => {
    const allPlayersCount = lobby.countAllPlayers()
    lobby.settings.maxPlayers = allPlayersCount
    await lobby.setMaxPlayers(allPlayersCount)
    lobby.table.state = 'DEALING'
    await database().ref(`${lobby.settings.name}/table/state`).set('DEALING')
  }

  lobby.startGame = async () => {
    lobby.table.state = 'GAME'
    lobby.table.lastDealtPlayer = null
    await database().ref(`${lobby.settings.name}/table`).update({
      state: 'GAME',
      lastDealtPlayer: null
    })
  }

  lobby.setMyNickname = (nickname) => {
    lobby.players[myPlayerID].nickname = nickname
    database().ref(`${lobby.settings.name}/players/${myPlayerID}/nickname`).set(nickname)
  }

  lobby.getPlayerCardFromTableCards = (playerID) => {
    return lobby.getAllCards()
      .find(card => card.holder === 'TABLE' && card.playerID === playerID)
  }

  lobby.addCardToTable = async (card) => {
    lobby.table.cards[card.cardID].holder = 'TABLE'
    await database().ref(`${lobby.settings.name}/table/cards/${card.cardID}`).update({
      holder: 'TABLE'
    })
  }

  lobby.isTableCardsFull = () => {
    return lobby.countAllPlayersWithCards() === lobby.countTableCards()
  }

  lobby.changeTurn = async (playerID) => {
    lobby.table.turn = playerID
    lobby.table.time = 0
    await database().ref(`${lobby.settings.name}/table`).update({
      turn: playerID,
      time: 0
    })
  }

  lobby.getHighestPlayerIDFromTableCardsExcludingPlayer = (cutPlayerID) => {
    const card = maxBy(lobby.getTableCards(), (card) => card.playerID === cutPlayerID ? 0 : card.number) || {}
    return card.playerID
  }

  lobby.setCutAnimation = async (playerID, card) => {
    lobby.table.gotCut = { playerID, card }
    await database().ref(`${lobby.settings.name}/table/gotCut`).set({ playerID, card })
  }

  lobby.removeCutAnimation = async (playerID, card) => {
    lobby.table.gotCut = null
    await database().ref(`${lobby.settings.name}/table/gotCut`).set(null)
  }

  lobby.discard = async () => {
    for (const tableCard of lobby.getTableCards()) {
      lobby.table.cards[tableCard.cardID].holder = 'DISCARD'
      await database().ref(`${lobby.settings.name}/table/cards/${tableCard.cardID}`).update({
        holder: 'DISCARD'
      })
    }
  }

  lobby.setDiscardAnimation = async () => {
    lobby.table.tableCardsFull = true
    await database().ref(`${lobby.settings.name}/table/tableCardsFull`).set(true)
  }

  lobby.removeDiscardAnimation = async () => {
    lobby.table.tableCardsFull = null
    await database().ref(`${lobby.settings.name}/table/tableCardsFull`).set(null)
  }

  lobby.isEndGame = () => {
    return lobby.countAllPlayersWithCards() === 1
  }

  lobby.setEndGame = async () => {
    const donkey = lobby.getAllPlayersWithCards()[0].playerID
    lobby.table.state = 'ENDGAME'
    lobby.table.donkey = donkey
    await database().ref(`${lobby.settings.name}/table`).update({
      state: 'ENDGAME',
      donkey
    })
  }

  lobby.moveTableCardsToPlayer = async (playerID) => {
    for (const tableCard of lobby.getTableCards()) {
      lobby.table.cards[tableCard.cardID].playerID = playerID
      lobby.table.cards[tableCard.cardID].holder = 'PLAYER'
      await database().ref(`${lobby.settings.name}/table/cards/${tableCard.cardID}`).update({
        playerID,
        holder: 'PLAYER'
      })
    }
  }

  lobby.getHighestPlayerIDFromTableCards = () => {
    const card = maxBy(lobby.getTableCards(), 'number') || {}
    return card.playerID
  }

  lobby.incrementTime = async () => {
    lobby.table.time = lobby.table.time + 1
    await database().ref(`${lobby.settings.name}/table/time`).set(lobby.table.time)
  }

  lobby.playCard = (card) => {
    onPlayCard(card, lobby)
  }

  lobby.canPlaySuite = (suite) => {
    return canPlaySuite(suite, lobby)
  }

  lobby.bot = () => {
    bot(lobby)
  }

  lobby.onDiscardAnimationEnd = async () => {
    if (lobby.amIHost()) {
      // change turn
      await lobby.changeTurn(lobby.getHighestPlayerIDFromTableCards())
      // discard
      await lobby.discard()
      // stop discard animation
      await lobby.removeDiscardAnimation()
      // check for winning condition
      if (lobby.isEndGame()) {
        await lobby.setEndGame()
      }
    }
  }

  lobby.onCutAnimationEnd = async () => {
    if (lobby.amIHost()) {
      const gutCutPlayerID = lobby.table.gotCut.playerID
      // move existing table cards to the player who got cut
      await lobby.moveTableCardsToPlayer(gutCutPlayerID)
      // change turn
      await lobby.changeTurn(gutCutPlayerID)
      // update firebase
      await lobby.removeCutAnimation()
      // check for winning condition
      if (lobby.isEndGame()) {
        await lobby.setEndGame()
      }
    }
  }

  return lobby
}
