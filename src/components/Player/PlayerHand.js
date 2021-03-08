import { useContext, useState } from 'react'

import database from 'utils/firebase'
import { LobbyContext } from 'utils/LobbyContext'

import { maxBy, cloneDeep } from 'lodash'

import {
  Box,
  Flex,
  Image
} from '@chakra-ui/react'

export default function PlayerHand ({ player }) {
  const [lobby] = useContext(LobbyContext)
  const [rotateCardDegree, setRotateCardDegree] = useState(120)

  const playerID = window.localStorage.getItem('playerID')

  const myCards = Object.values(lobby.table?.cards || {})
    .filter(card => card.playerID === playerID)

  const canPlaySuite = (suite) => {
    // check if its current user's turn
    if (playerID !== lobby.table.turn) {
      return false
    }

    if (!lobby.table.pile) {
      return 'GOOD_PILE_EMPTY'
    } else {
      const topPileCard = Object.values(lobby.table.pile)[0]
      // check if playing card's suite === topPileCard's suite
      if (suite === topPileCard.suite) {
        return 'GOOD' // legal move
      } else {
        const hasMatchingSuite = myCards.some(({ suite }) => suite === topPileCard.suite)
        if (hasMatchingSuite) {
          return false // invalid move
        } else {
          return 'CUT' // cutting
        }
      }
    }
  }

  const onPlayCard = (playedCard) => {
    // check for endgame and return if true
    const canPlay = canPlaySuite(playedCard.suite)
    if (canPlay) {
      // get local copy of table
      let table = cloneDeep(lobby.table)

      // convert firebase objects (cards, pile, discard) to actual js arrays
      table = {
        ...table,
        cards: Object.values(table.cards),
        pile: Object.values(table.pile || {}),
        discard: Object.values(table.discard || {})
      }

      // get the highest number from current pile
      const maxPileCard = maxBy(table.pile, 'number') || {}

      // add card to table pile and remove from current player's hand
      table = {
        ...table,
        pile: [playedCard, ...table.pile],
        cards: table.cards.map(card => card.suite === playedCard.suite && card.number === playedCard.number ? { ...card, playerID: null } : card)
      }

      // get remaining players
      let playersWithCards = Object.keys(lobby.players).reduce((accumulator, playerID) => {
        accumulator[playerID] = true
        return accumulator
      }, {})
      for (const card of table.cards) {
        if (card.playerID) {
          playersWithCards[card.playerID] = true
        }
      }
      /*
        {
          playerID: true,
          playerID: true,
          ...
        }
      */
      playersWithCards = Object.keys(playersWithCards)
      // [playerID, playerID, ...etc]

      if (canPlay === 'CUT') {
        // variable named by @arun99-dev (like and sub <3)
        const gotCuttedPlayerID = maxPileCard.playerID
        const pileCardsObject = {}
        for (const pileCard of table.pile) {
          pileCardsObject[`${pileCard.number}-to-${pileCard.suite}`] = pileCard
        }
        // add to existing cards of the player who got cut and empty the pile and change turn
        table = {
          ...table,
          cards: table.cards.map(card => table.pile.find(pileCard => pileCard.cardID === card.cardID) ? { ...card, playerID: gotCuttedPlayerID } : card),
          pile: [],
          turn: gotCuttedPlayerID
        }
      } else {
        // discard pile if full
        if (table.pile.length === playersWithCards.length) {
          // find maxCard's player from pile and set as next turn
          const maxCardPlayerID = maxPileCard.playerID
          table = {
            ...table,
            pile: [],
            discard: [...table.pile, ...table.discard],
            turn: maxCardPlayerID
          }
        } else {
          // change turn
          const currentPlayerIndex = playersWithCards.findIndex(ID => ID === playerID)
          const nextPlayerIndex = (currentPlayerIndex + 1) % playersWithCards.length
          const nextPlayerID = playersWithCards[nextPlayerIndex]
          table = {
            ...table,
            turn: nextPlayerID
          }
        }
      }
      // check for winning condition
      if (playersWithCards.length === 1) {
        database().ref(`${lobby.name}`).update({
          state: 'END_GAME',
          donkey: playersWithCards[0],
          table: null
        })
      }

      // convert cards array back to firebase object
      table = {
        ...table,
        cards: table.cards.reduce((accumulator, card) => {
          accumulator[card.cardID] = card
          return accumulator
        }, {})
      }
      // update table
      database().ref(`${lobby.name}/table`).set(table)
    }
  }

  return (
    <Flex
      w='100%'
      h='180px'
      wrap='wrap'
      position='absolute'
      bottom={0}
      overflow='hidden'
    >
      <Box
        width='100%'
        height='100%'
        position='absolute'
      >
        {myCards.map((card, idx) => (
          <Image
            src={card.url}
            key={card.suite + card.number}
            alt={`${card.number} of ${card.suite}`}
            left='50%'
            top='50%'
            height='100px'
            maxHeight='200px'
            objectFit='contain'
            position='absolute'
            filter='drop-shadow(0px 5px 6px rgba(0, 0, 0, 0.25))'
            transform={`translate(-50%, -50%) rotate(${-rotateCardDegree / 2 + rotateCardDegree / (myCards.length + 1) * (idx + 1)}deg)`}
            transformOrigin='center 200%'
            transition='transform 0.3s ease-out'
            onClick={() => onPlayCard(card)}
            onMouseEnter={() => setRotateCardDegree(140)}
            onMouseLeave={() => setRotateCardDegree(120)}
          />
        ))}
      </Box>
    </Flex>
  )
}
