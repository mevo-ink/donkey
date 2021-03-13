import {
  useContext,
  createContext
} from 'react'

import { maxBy } from 'lodash'

import onPlayCard from 'context/utils/onPlayCard'
import bot from 'context/utils/bot'

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

  return lobby
}
