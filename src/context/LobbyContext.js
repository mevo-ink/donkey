import {
  useContext,
  createContext
} from 'react'

// import { maxBy } from 'lodash'

// import onPlayCard from 'context/utils/onPlayCard'
// import canPlaySuite from 'context/utils/canPlaySuite'
// import bot from 'context/utils/bot'

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

  lobby.getHost = () => {
    return lobby.players[lobby.settings.host.playerID]
  }

  lobby.isHostOnline = () => {
    return !lobby.settings.host.lastOnline
  }

  lobby.findNewHost = () => {
    const currentHostID = lobby.getHost()
    return lobby.getAllPlayers().find(({ playerID, lastOnline }) => playerID !== currentHostID && !lastOnline)
  }

  lobby.setNewHost = async (playerID) => {
    await database().ref(`${lobby.name}/settings/host`).update({
      host: playerID,
      lastOnline: null
    })
  }

  // players
  lobby.getAllPlayers = () => {
    // we check if the player has a nickname to avoid getting players not in room.
    // Firebase sets player's lastOnline on disconnect - but if the player leaves the room and on quick refresh,
    // the player will be added again by the usePlayerDisconnect hook with just the lastOnline value.
    // We simply ignore players who don't have a nickname set (aka; they only have lastOnline)
    return Object.values(lobby.players)
      .filter(({ nickname }) => nickname)
  }

  lobby.countAllPlayers = () => {
    return Object.keys(lobby.table.seatings).length
  }

  lobby.getPlayer = (playerID) => {
    return lobby.players[playerID]
  }

  lobby.getMyself = () => {
    return lobby.players[myPlayerID]
  }

  lobby.setMaxPlayers = async (count) => {
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
    const seatingsWRTMyself = lobby.getSeatingsWRTMyself()
    const playerIDIdx = seatingsWRTMyself.findIndex(ID => ID === playerID)
    const allPlayerSeatings = assignedSeats[lobby.countAllPlayers()]
    const playerSeatingPositionIdx = allPlayerSeatings[playerIDIdx]
    const [avatarPos, cardPos, dealingPos] = positions[playerSeatingPositionIdx]
    return { avatarPos, cardPos, dealingPos }
  }

  lobby.dealPlayerCard = async (playerIndex, card) => {
    // deal the card to the player sitting at playerIndex position
    const playerID = lobby.getPlayerSeatings()[playerIndex]
    await database().ref(`${lobby.settings.name}/table/cards/${card.cardID}`).set({
      ...card,
      playerID
    })
    if (card.cardID === '14-of-spades') {
      // set the turn to the player who got Ace of Spades
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

  lobby.getPlayerCards = (playerID) => {
    return lobby.getAllCards().filter(card => card.playerID === playerID)
  }

  lobby.countPlayerCards = (playerID) => {
    return lobby.getAllCards().filter(card => card.playerID === playerID)
  }

  lobby.hasDiscard = () => {
    return !lobby.table.gotCut && lobby.getAllCards().some(({ playerID }) => !playerID)
  }

  // game
  lobby.startDealing = async () => {
    await database().ref(`${lobby.settings.name}/table`).update({
      state: 'DEALING',
      maxPlayers: lobby.getAllPlayers().length
    })
  }

  lobby.startGame = async () => {
    await database().ref(`${lobby.settings.name}/table/state`).set('GAME')
  }

  lobby.setMyNickname = (nickname) => {
    database().ref(`${lobby.settings.name}/players/${myPlayerID}/nickname`).set(nickname)
  }

  lobby.getPlayerCardFromCurrentTurn = (playerID) => {
    return lobby.getAllCards()
      .find(card => card.state === 'TURN' && card.playerID === playerID)
  }

  // lobby.isEndGame = () => {
  //   const playersWithCards = Object.keys(lobby.players).filter(playerID => Object.values(lobby.table.cards || {}).some(card => card.playerID === playerID))
  //   const playersInPile = Object.values(lobby.pile || {}).map(({ playerID }) => playerID)
  //   return [...new Set([...playersWithCards, ...playersInPile])].length === 1
  // }

  // lobby.getPlayerIDsWithCards = () => {
  //   const playersIDsWithCards = Object.keys(lobby.players).filter(playerID => Object.values(lobby.table?.cards || {}).some(card => card.playerID === playerID))
  //   const playerIDsInPile = Object.values(lobby.pile || {}).map(({ playerID }) => playerID)
  //   return [...new Set([...playersIDsWithCards, ...playerIDsInPile])]
  // }

  // lobby.getPlayers = () => {
  //   const playerIDsWithCards = lobby.getPlayerIDsWithCards()
  //   return Object.values(lobby.players || {}).map(player => ({ ...player, hasCards: playerIDsWithCards.includes(player.playerID) }))
  // }

  // lobby.getPlayerAtIdx = (idx) => {
  //   return Object.values(lobby.players || {})[idx]
  // }

  // lobby.getNextPlayerInTurn = () => {
  //   return Object.keys(lobby.players)[0]
  // }

  // lobby.getPileCards = () => {
  //   return Object.values(lobby.table.pile || {})
  // }

  // lobby.isPileFull = () => {
  //   return Object.values(lobby.table.pile || {}).length === lobby.getPlayerIDsWithCards().length
  // }

  // lobby.emptyDiscard = () => {
  //   lobby.table.discard = null
  // }

  // lobby.discardPile = () => {
  //   lobby.table.discard = { ...lobby.table.discard, ...lobby.table.pile }
  //   lobby.table.pile = null
  // }

  // lobby.getHighestPlayerIDFromPile = () => {
  //   const card = maxBy(Object.values(lobby.table.pile || {}), 'number') || {}
  //   return card.playerID
  // }

  // lobby.getHighestPlayerIDFromPileExcludingPlayer = (cuttedPlayerID) => {
  //   const card = maxBy(Object.values(lobby.table.pile), (card) => card.playerID === cuttedPlayerID ? 0 : card.number) || {}
  //   return card.playerID
  // }

  // lobby.addCardToTablePile = (card) => {
  //   if (!lobby.table.pile) lobby.table.pile = {}
  //   lobby.table.pile[card.cardID] = { ...card }
  // }

  // lobby.movePileCardsToPlayer = (playerID) => {
  //   for (const card of Object.values(lobby.table.pile)) {
  //     lobby.table.cards[card.cardID] = {
  //       ...lobby.table.cards[card.cardID],
  //       playerID
  //     }
  //   }
  //   lobby.table.pile = null
  // }

  // lobby.addCardToPlayer = (card, playerID) => {
  //   lobby.table.cards = {
  //     ...lobby.table.cards,
  //     [card.cardID]: {
  //       ...lobby.table.cards[card.cardID],
  //       playerID
  //     }
  //   }
  // }

  // lobby.removeCardFromPlayer = (card) => {
  //   lobby.table.cards[card.cardID] = {
  //     ...lobby.table.cards[card.cardID],
  //     playerID: null
  //   }
  // }

  // lobby.changeTurn = (playerID) => {
  //   lobby.table.turn = playerID
  //   lobby.table.time = 0
  // }

  // lobby.getMyCards = () => {
  //   return Object.values(lobby.table?.cards || {})
  //     .filter(({ playerID }) => playerID === myPlayerID)
  // }

  // lobby.getHost = () => {
  //   return lobby.players[lobby.host]
  // }

  // lobby.playCard = (card) => {
  //   onPlayCard(card, lobby)
  // }

  // lobby.canPlaySuite = (suite) => {
  //   return canPlaySuite(suite, lobby)
  // }

  // lobby.bot = () => {
  //   bot(lobby)
  // }

  // lobby.setPlayerPositions = (playerID, positions) => {
  //   lobby.players[playerID].positions = positions
  // }

  // lobby.getSeatingPositions = () => {
  //   const seatings = {
  //     1: [0],
  //     2: [0, 6],
  //     3: [0, 3, 9],
  //     4: [0, 3, 6, 9],
  //     5: [0, 3, 6, 8, 10],
  //     6: [0, 2, 4, 6, 8, 10],
  //     7: [0, 2, 4, 6, 8, 9, 10],
  //     8: [0, 2, 3, 4, 6, 8, 9, 10],
  //     9: [0, 1, 2, 3, 4, 6, 8, 9, 10],
  //     10: [0, 1, 2, 3, 4, 5, 6, 8, 9, 10],
  //     11: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  //     12: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  //   }[lobby.getPlayers().length]

  //   const seatings = [
  //     [{ bottom: '-23.5px' }, { top: '361.5px' }, { x: 0, y: 230 }],
  //     [{ left: '0px', bottom: '25px' }, { left: '40px', top: '330px' }, { x: -90, y: 185 }],
  //     [{ left: '-22.75px', bottom: '115px' }, { left: '35px', top: '260px' }, { x: -115, y: 100 }],
  //     [{ left: '-22.75px', bottom: '204px' }, { left: '35px', top: '190px' }, { x: -115, y: -0 }],
  //     [{ left: '-22.75px', bottom: '293px' }, { left: '35px', top: '120px' }, { x: -115, y: -100 }],
  //     [{ left: '0px', bottom: '383px' }, { left: '40px', top: '50px' }, { x: -90, y: -185 }],

  //     [{ top: '-23.5px' }, { top: '18.5px' }, { x: 0, y: -230 }],
  //     [{ right: '0px', bottom: '383px' }, { right: '40px', top: '50px' }, { x: 90, y: -185 }],
  //     [{ right: '-22.75px', bottom: '293px' }, { right: '35px', top: '120px' }, { x: 115, y: -100 }],
  //     [{ right: '-22.75px', bottom: '204px' }, { right: '35px', top: '190px' }, { x: 115, y: -0 }],
  //     [{ right: '-22.75px', bottom: '115px' }, { right: '35px', top: '260px' }, { x: 115, y: 100 }],
  //     [{ right: '0px', bottom: '25px' }, { right: '40px', top: '330px' }, { x: 90, y: 185 }]
  //   ]

  //   return seatings.filter((_, idx) => arrangements.includes(idx)).map((pos, idx) => ([...pos, lobby.getPlayerAtIdx(idx)]))
  // }

  return lobby
}
