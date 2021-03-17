import { useEffect } from 'react'

import database from 'utils/firebase'

import { useLobby } from 'context/LobbyContext'

import {
  Box,
  Flex,
  Text,
  Image
} from '@chakra-ui/react'

import thanosSnap from 'images/thanosSnap.gif'
import bot from 'images/bot.png'

import { motion } from 'framer-motion'
const MotionBox = motion(Box)
const MotionFlex = motion(Flex)
const MotionText = motion(Text)
const MotionImage = motion(Image)

export default function CutAnimation () {
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
    }, 8000) // eslint-disable-next-line
  }, [])

  return (
    <>
      <MotionText
        position='absolute'
        fontSize='23px'
        lineHeight='23px'
        fontWeight='bold'
        initial={{ opacity: 0, scale: 0, y: 0 }}
        animate={{ opacity: 1, scale: 1, y: -58, transition: { delay: 6.5, duration: 1 } }}
      >
        {gotCuttedPlayer.nickname} got Cutted!!
      </MotionText>
      <MotionFlex
        width='90%'
        justifyContent='space-between'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1 } }}
      >
        <MotionBox
          position='relative'
          animate={{ x: [0, 32], transition: { delay: 5.6, duration: 1 } }}
        >
          <MotionImage
            src={thanosSnap}
            width='20px'
            objectFit='contain'
            position='absolute'
            bottom='8px'
            left='-8px'
            initial={{ x: 40 }}
            animate={{ opacity: [0, 1, 1, 1, 1, 1, 0], transition: { delay: 3.3, duration: 1.6 } }}
          />
          <MotionImage
            src={doCutPlayer.avatar ? doCutPlayer.avatar : bot}
            width='50px'
            objectFit='contain'
            borderRadius='100%'
            animate={{ x: [0, 40], transition: { delay: 1, duration: 2 } }}
          />
        </MotionBox>
        <MotionBox
          position='relative'
          animate={{ x: [0, -40], transition: { delay: 1, duration: 2 } }}
        >
          <MotionImage
            src={gotCuttedPlayer.avatar ? gotCuttedPlayer.avatar : bot}
            width='50px'
            objectFit='contain'
            borderRadius='100%'
            animate={{ opacity: 0, transition: { delay: 4, duration: 2 } }}
          />
        </MotionBox>
      </MotionFlex>
    </>
  )
}
