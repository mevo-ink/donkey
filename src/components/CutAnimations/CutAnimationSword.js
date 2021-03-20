import { useEffect } from 'react'

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

  const cutPlayer = lobby.getPlayer(lobby.table.turn)
  const gutCutPlayerID = lobby.table.gotCut.playerID
  const gotCutPlayer = lobby.getPlayer(gutCutPlayerID)

  useEffect(() => {
    setTimeout(async () => {
      await lobby.onCutAnimationEnd()
    }, 8000) // eslint-disable-next-line
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
          src={cutPlayer.avatar}
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
          src={gotCutPlayer.avatar}
          width='50px'
          objectFit='contain'
          borderRadius='100%'
        />
      </MotionBox>
    </MotionFlex>
  )
}
