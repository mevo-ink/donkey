import { useEffect } from 'react'

import { useLobby } from 'context/LobbyContext'

import { Image } from '@chakra-ui/react'

import thanosSnap from 'images/thanosSnap.gif'
// import bot from 'images/bot.png'

import { motion } from 'framer-motion'
const MotionImage = motion(Image)

export default function CutAnimationSnap () {
  const lobby = useLobby()

  const cutPlayerPos = lobby.getPlayerPositions(lobby.table.turn)

  // const gotCutPlayer = lobby.getPlayer(lobby.table.gotCut.playerID)
  // const cutPlayerPos = lobby.getPosition(lobby.table.gotCut.playerID)

  useEffect(() => {
    setTimeout(async () => {
      await lobby.onCutAnimationEnd()
    }, 8000) // eslint-disable-next-line
  }, [])

  return (
    <>
      <MotionImage
        src={thanosSnap}
        width='16px'
        objectFit='contain'
        position='absolute'
        zIndex='10'
        initial={{ ...cutPlayerPos.avatarPos, opacity: 0, x: -15, y: 8 }}
        animate={{ opacity: 1, transition: { delay: 0.8, duration: 0.4 } }}
      />
      {/* <MotionImage
        src={bot}
        width='50px'
        objectFit='contain'
        borderRadius='100%'
        // animate={{ x: [0, 40], transition: { delay: 1, duration: 2 } }}
      /> */}
    </>
  )
}
