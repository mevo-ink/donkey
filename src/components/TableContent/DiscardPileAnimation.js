import { useEffect } from 'react'

import database from 'utils/firebase'

import { useLobby } from 'context/LobbyContext'

import { Image } from '@chakra-ui/react'

import cardBack from 'images/cardBack.png'

import { motion } from 'framer-motion'
const MotionImage = motion(Image)

export default function DiscardPileAnimation () {
  const lobby = useLobby()

  const cardPositions = lobby.getSeatingPositions().map(([_, cardPositions]) => cardPositions)

  useEffect(() => {
    setTimeout(() => {
      if (lobby.getMyself().playerID === lobby.host) {
        // change turn
        lobby.changeTurn(lobby.getHighestPlayerIDFromPile())
        // discard the pile
        lobby.discardPile()
        // update firebase
        database().ref(`${lobby.name}/table`).set(lobby.table)
        database().ref(`${lobby.name}/pileFull`).set(null)
        // check for winning condition
        if (lobby.isEndGame()) {
          lobby.emptyDiscard()
          database().ref(`${lobby.name}`).update({
            state: 'ENDGAME',
            donkey: lobby.getPlayerIDsWithCards()[0]
          })
        }
      }
    }, 5000) // eslint-disable-next-line
  }, [])

  return (
    cardPositions.map((pos, idx) => {
      return (
        <MotionImage
          key={idx}
          src={cardBack}
          width='40px'
          objectFit='contain'
          maxW='unset'
          position='absolute'
          zIndex='3'
          initial={{ scale: 1, ...pos }}
          animate={{ scale: 0, ...pos, top: '190px', bottom: '190px', left: '87.5px', right: '87.5px', transition: { delay: 0.8, duration: 1 } }}
        />
      )
    })
  )
}
