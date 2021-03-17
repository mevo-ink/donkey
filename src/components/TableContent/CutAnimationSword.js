import { useEffect } from 'react'

import database from 'utils/firebase'

import { useLobby } from 'context/LobbyContext'

import {
  Box,
  Flex,
  Image
} from '@chakra-ui/react'

import sword from 'images/sword.png'
import spark from 'images/spark.png'

import { motion } from 'framer-motion'
const MotionBox = motion(Box)
const MotionFlex = motion(Flex)
const MotionImage = motion(Image)

export default function CutAnimationSword () {
  const lobby = useLobby()

  const doCutPlayer = lobby.getPlayer(lobby.table.turn)
  const gotCuttedPlayer = lobby.getPlayer(lobby.gotCut.playerID)

  useEffect(() => {
    setTimeout(() => {
      if (lobby.getMyself().playerID === lobby.host) {
        // move existing pile cards to the player who got cut
        lobby.movePileCardsToPlayer(lobby.gotCut.playerID)
        // add cut card to got cutted player's hand
        lobby.addCardToPlayer(lobby.gotCut.card, lobby.gotCut.playerID)
        // change turn
        lobby.changeTurn(lobby.gotCut.playerID)
        // update firebase
        database().ref(`${lobby.name}/table`).set(lobby.table)
        database().ref(`${lobby.name}/gotCut`).set(null)
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
    <MotionFlex
      width='90%'
      justifyContent='space-between'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1 } }}
    >
      <MotionBox
        position='relative'
        animate={{ x: [0, 40, 40, 20, 40, 40, 10, 40], transition: { delay: 2, duration: 3 } }}
      >
        <MotionImage
          src={spark}
          width='30px'
          position='absolute'
          objectFit='contain'
          zIndex='10'
          bottom='14px'
          left='43px'
          animate={{ opacity: [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0], transition: { delay: 2, duration: 3.2 } }}
        />
        <MotionImage
          src={sword}
          width='50px'
          position='absolute'
          objectFit='contain'
          transform='rotate(135deg)'
          bottom='20px'
          left='30px'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 1.5, duration: 0.3 } }}
          // transition={{ delay: 1.5, duration: 0.3 }}
        />
        <MotionImage
          src={doCutPlayer.avatar}
          width='50px'
          objectFit='contain'
          borderRadius='100%'
        />
      </MotionBox>
      <MotionBox
        position='relative'
        animate={{ x: [0, -40, -40, -20, -40, -40, -10, -40], transition: { delay: 2, duration: 3 } }}
      >
        <MotionImage
          src={sword}
          width='50px'
          position='absolute'
          objectFit='contain'
          transform='rotate(45deg)'
          bottom='20px'
          right='30px'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 1.5, duration: 0.3 } }}
        />
        <MotionImage
          src={gotCuttedPlayer.avatar}
          width='50px'
          objectFit='contain'
          borderRadius='100%'
        />
      </MotionBox>
    </MotionFlex>
  )
}
