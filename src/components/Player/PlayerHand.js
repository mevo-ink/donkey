import { useContext } from 'react'

import database from 'utils/firebase'
import { LobbyContext } from 'utils/LobbyContext'

import { maxBy } from 'lodash'

import {
  Flex,
  Image,
  Button
} from '@chakra-ui/react'

import { getCard } from 'utils/cards'

import HourGlass from 'components/Player/HourGlass'

export default function PlayerHand ({ player }) {
  const [lobby] = useContext(LobbyContext)

  const playerID = window.localStorage.getItem('playerID')

  const myCards = Object.entries(player.cards || {}).map(([key, card]) => ({ ...card, key, url: getCard(card), playerID }))

  const canPlaySuite = (suite) => {
    // check if its current user's turn
    if (playerID !== lobby.table.turn) {
      return false
    }

    if (!lobby.table.pile) {
      return 'GOOD_PILE_EMPTY'
    } else {
      const topPileCard = Object.values(lobby.table.pile)[Object.values(lobby.table.pile).length - 1]
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

  const onPlayCard = ({ key, suite, number, url }) => {
    // check for endgame and return if true
    const canPlay = canPlaySuite(suite)
    if (canPlay) {
      const maxCard = canPlay === 'CUT' ? maxBy(Object.values(lobby.table.pile), 'number') : null
      // add card to table pile
      database().ref(`${lobby.name}/table/pile`).push({ suite, number, playerID, url })
        .then(() => {
          // remove from hand
          database().ref(`${lobby.name}/players/${playerID}/cards/${key}`).remove()
          const players = Object.values(lobby.players).filter(player => {
            if (player === playerID) {
              return player.cards && Object.values(player.cards).length >= 1
            } else {
              return player.cards
            }
          })
          if (canPlay === 'CUT') {
            const maxCardPlayerID = maxCard.playerID
            const maxPlayerCurrentCards = lobby.players[maxCardPlayerID].cards
            const pileCardsObject = {}
            for (const pileCard of Object.values(lobby.table.pile)) {
              pileCardsObject[`${pileCard.number}-to-${pileCard.suite}`] = pileCard
            }
            // add to existing cards of maxCardPlayerID
            database().ref(`${lobby.name}/players/${maxCardPlayerID}/cards`).set({
              ...maxPlayerCurrentCards,
              ...pileCardsObject,
              [`${number}-to-${suite}`]: {
                number,
                suite
              }
            })
            // discard pile
            database().ref(`${lobby.name}/table/pile`).set(null)
            // change turn
            database().ref(`${lobby.name}/table/turn`).set(maxCardPlayerID)
          } else {
            // discard pile if full
            if (Object.values(lobby.table.pile || {}).length + 1 === players.length) {
              // find maxCard's player from pile and set as next turn
              const maxCard = maxBy([...Object.values(lobby.table.pile), { suite, number, playerID }], 'number')
              const maxCardPlayerID = maxCard.playerID
              database().ref(`${lobby.name}/table/turn`).set(maxCardPlayerID)
              database().ref(`${lobby.name}/table/discard`).set([{ suite, number, playerID }, ...Object.values(lobby.table.pile), ...Object.values(lobby.table.discard || {})])
              database().ref(`${lobby.name}/table/pile`).set(null)
            } else {
              // change turn
              const currentPlayerIndex = players.findIndex(player => player.playerID === playerID)
              const nextPlayerIndex = (currentPlayerIndex + 1) % players.length
              const nextPlayer = players[nextPlayerIndex]
              database().ref(`${lobby.name}/table/turn`).set(nextPlayer.playerID)
            }
          }
          // check for winning condition
          if (players.length === 1) {
            database().ref(`${lobby.name}`).update({
              state: 'END_GAME',
              donkey: players[0].playerID,
              table: null
            })
          }
        })
    }
  }

  return (
    <Flex w='100vw' wrap='wrap'>
      {myCards.map(card => (
        <Button
          key={card.suite + card.number}
          alt={`${card.number} of ${card.suite}`}
          onClick={() => onPlayCard(card)}
          p='0px'
          m='0px'
        >
          <Image
            src={card.url}
            height='80px'
            objectFit='contain'
          />
        </Button>
      ))}
      {playerID === lobby.table?.turn && <HourGlass lobby={lobby} />}
    </Flex>
  )
}
