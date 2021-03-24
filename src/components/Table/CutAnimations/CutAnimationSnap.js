import { useEffect } from 'react'

import { useLobby } from 'context/LobbyContext'

import { Image } from '@chakra-ui/react'

import thanosSnap from 'images/thanosSnap.gif'

import { motion, useAnimation } from 'framer-motion'

const MotionImage = motion(Image)

export default function CutAnimationSnap ({ onFinish }) {
  const lobby = useLobby()

  const gauntletControls = useAnimation()

  const { avatarPos: cutPlayerPos } = lobby.getPlayerPositions(lobby.table.turn)

  useEffect(() => {
    (async () => {
      await gauntletControls.start({
        opacity: 1,
        y: 5,
        transition: { delay: 1.5, duration: 1 }
      })
      await gauntletControls.start({
        opacity: 0,
        transition: { delay: 0.5, duration: 0.5 }
      })
      lobby.endSnapAnimation()
    })() // eslint-disable-next-line
  }, [])

  return (
    <MotionImage
      src={thanosSnap}
      width='20px'
      objectFit='contain'
      position='absolute'
      zIndex='10'
      initial={{ ...cutPlayerPos, opacity: 0, x: -10, y: -18 }}
      animate={gauntletControls}
    />
  )
}
