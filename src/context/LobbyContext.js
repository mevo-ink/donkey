import {
  useContext,
  createContext
} from 'react'

import { maxBy } from 'lodash'

import onPlayCard from 'context/utils/onPlayCard'
import bot from 'context/utils/bot'

import database from 'utils/firebase'

const myPlayerID = window.localStorage.getItem('playerID')

export const LobbyContext = createContext()

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
    return { state: 'NOT_READY' }
    // throw new Error('useLobby must be used within a LobbyProvider')
  }

  // add some common getters for lobby
  lobby.isEndGame = () => {
    const playersWithCards = Object.keys(lobby.players).filter(playerID => Object.values(lobby.table.cards).some(card => card.playerID === playerID))
    const playersInPile = Object.values(lobby.pile || {}).map(({ playerID }) => playerID)
    return [...new Set([...playersWithCards, ...playersInPile])].length === 1
  }

  lobby.getPlayerIDsWithCards = () => {
    return Object.keys(lobby.players).filter(playerID => Object.values(lobby.table.cards).some(card => card.playerID === playerID))
  }

  lobby.getPileCards = () => {
    return Object.values(lobby.table.pile || {})
  }

  lobby.isPileFull = () => {
    return Object.values(lobby.table.pile || {}).length === lobby.getPlayerIDsWithCards().length
  }

  lobby.emptyDiscard = () => {
    lobby.table.discard = null
  }

  lobby.discardPile = () => {
    lobby.table.discard = { ...lobby.table.discard, ...lobby.table.pile }
    lobby.table.pile = null
  }

  lobby.getHighestPlayerIDFromPile = () => {
    const card = maxBy(Object.values(lobby.table.pile || {}), 'number') || {}
    return card.playerID
  }

  lobby.getHighestPlayerIDFromPileExcludingPlayer = (cuttedPlayerID) => {
    const card = maxBy(Object.values(lobby.table.pile), (card) => card.playerID === cuttedPlayerID ? 0 : card.number) || {}
    return card.playerID
  }

  lobby.addCardToTablePile = (card) => {
    if (!lobby.table.pile) lobby.table.pile = {}
    lobby.table.pile[card.cardID] = { ...card }
  }

  lobby.getPlayerCardFromPile = (playerID) => {
    return Object.values(lobby.table?.pile || {}).find(card => card.playerID === playerID)
  }

  lobby.movePileCardsToPlayer = (playerID) => {
    for (const card of Object.values(lobby.table.pile)) {
      lobby.table.cards[card.cardID].playerID = {
        ...lobby.table.cards[card.cardID],
        playerID
      }
    }
    lobby.table.pile = null
  }

  lobby.addCardToPlayer = (card, playerID) => {
    lobby.table.cards[card.cardID] = {
      ...lobby.table.cards[card.cardID],
      playerID
    }
  }

  lobby.removeCardFromPlayer = (card) => {
    lobby.table.cards[card.cardID] = {
      ...lobby.table.cards[card.cardID],
      playerID: null
    }
  }

  lobby.changeTurn = (playerID) => {
    lobby.table.turn = playerID
    lobby.table.time = 0
  }

  lobby.getMyCards = () => {
    return Object.values(lobby.table?.cards || {})
      .filter(({ playerID }) => playerID === myPlayerID)
  }

  lobby.getPlayerCards = (playerID) => {
    return Object.values(lobby.table?.cards || {})
      .filter(card => card.playerID === playerID)
  }

  lobby.getPlayers = () => {
    return Object.values(lobby.players || {})
  }

  lobby.getMyself = () => {
    return lobby.players[myPlayerID]
  }

  lobby.getPlayer = (playerID) => {
    return lobby.players[playerID]
  }

  lobby.getHost = () => {
    return lobby.players[lobby.host]
  }

  lobby.playCard = (card) => {
    onPlayCard(card, lobby)
  }

  lobby.bot = () => {
    bot(lobby)
  }

  lobby.setMaxPlayers = (number) => {
    database().ref(`${lobby.name}`).update({
      maxPlayers: number
    })
  }

  lobby.setPlayerNickname = (nickname) => {
    database().ref(`${lobby.name}/players/${myPlayerID}`).update({
      nickname: nickname
    })
  }

  lobby.dealPlayerCard = (playerIndex, card) => {
    const players = lobby.getPlayers()
    const player = players[playerIndex]
    const cardID = `${card.number}-of-${card.suite}`
    database().ref(`${lobby.name}/table/cards/${cardID}`).set({
      ...card,
      cardID,
      playerID: player.playerID
    })
    if (card.number === 14 && card.suite === 'spades') {
      database().ref(`${lobby.name}/table`).update({
        turn: player.playerID,
        time: 0
      })
    }
    playerIndex = (playerIndex + 1) % players.length
    return playerIndex
  }

  lobby.getSeatingPositions = () => {
    const arrangements = {
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
    }[lobby.getPlayers().length]

    const coordinates = [
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

    return coordinates.filter((_, idx) => arrangements.includes(idx))
  }

  return lobby
}
