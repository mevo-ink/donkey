import { useEffect } from 'react'

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

export default function CutAnimationSnap () {
  const lobby = useLobby()

  const cutPlayer = lobby.getPlayer(lobby.table.turn)
  const gutCutPlayerID = lobby.table.gotCut.playerID
  const gotCutPlayer = lobby.getPlayer(gutCutPlayerID)

  useEffect(() => {
    setTimeout(async () => {
      await lobby.onCutAnimationEnd()
    }, 8000) // eslint-disable-next-line
  }, [])

  return (
    <>
      <MotionText
        position='absolute'
        fontSize='23px'
        lineHeight='23px'
        fontWeight='bold'
        zIndex='3'
        initial={{ opacity: 0, scale: 0, y: 0 }}
        animate={{ opacity: 1, scale: 1, y: -58, transition: { delay: 7.8, duration: 1 } }}
      >
        {gotCutPlayer.nickname} got Cut!!
      </MotionText>
      <MotionFlex
        width='90%'
        justifyContent='space-between'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1 } }}
      >
        <MotionBox
          position='relative'
          animate={{ x: [0, 32], transition: { delay: 7, duration: 1 } }}
        >
          <MotionImage
            src={thanosSnap}
            width='20px'
            objectFit='contain'
            position='absolute'
            bottom='8px'
            left='-8px'
            zIndex='10'
            initial={{ x: 40 }}
            animate={{ opacity: [0, 1, 1, 1, 1, 1, 1, 1, 1, 0], transition: { delay: 3.3, duration: 1.8 } }}
          />
          <MotionImage
            src={cutPlayer.avatar ? cutPlayer.avatar : bot}
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
            src={gotCutPlayer.avatar ? gotCutPlayer.avatar : bot}
            width='50px'
            objectFit='contain'
            borderRadius='100%'
            animate={{ x: [0, 40], transition: { delay: 1, duration: 2 } }}
          />
        </MotionBox>
      </MotionFlex>
    </>
  )
}
