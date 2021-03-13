import {
  useContext,
  createContext
} from 'react'

import { maxBy } from 'lodash'

import onPlayCard from 'context/utils/onPlayCard'
import bot from 'context/utils/bot'

import database from 'utils/firebase'

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
    const playersInPile = Object.keys(lobby.pile || {})
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
    const card = maxBy(Object.values(lobby.table.pile), 'number') || {}
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
    const myPlayerID = window.localStorage.getItem('playerID')
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
      [{ bottom: '-10px' }, { bottom: '45px' }, { x: 0, y: 222 }],
      [{ left: '15px', bottom: '33px' }, { left: '40px', bottom: '33px' }, { x: -80, y: 170 }],
      [{ left: '-10px', bottom: '120px' }, { left: '50px', bottom: '15px' }, { x: -91, y: 93 }],
      [{ left: '-10px', top: '219.5px' }, { left: '42px' }, { x: -91, y: -0 }],
      [{ left: '-10px', top: '120px' }, { left: '50px', top: '15px' }, { x: -91, y: -79 }],
      [{ left: '15px', top: '33px' }, { left: '40px', top: '33px' }, { x: -80, y: -170 }],
      [{ top: '-10px' }, { top: '45px' }, { x: 0, y: -232 }],
      [{ right: '15px', top: '33px' }, { right: '40px', top: '33px' }, { x: 80, y: -170 }],
      [{ right: '-10px', top: '120px' }, { right: '50px', top: '15px' }, { x: 90, y: -79 }],
      [{ bottom: '219.5px', right: '-13px' }, { right: '42px' }, { x: 90, y: -0 }],
      [{ right: '-10px', bottom: '120px' }, { right: '50px', bottom: '15px' }, { x: 90, y: 93 }],
      [{ right: '15px', bottom: '33px' }, { right: '40px', bottom: '33px' }, { x: 80, y: 170 }]
    ]

    return coordinates.filter((_, idx) => arrangements.includes(idx))
  }

  return lobby
}
