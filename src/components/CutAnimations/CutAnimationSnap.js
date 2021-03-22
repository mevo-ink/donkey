import { useEffect } from 'react'

import { useLobby } from 'context/LobbyContext'

import { Image } from '@chakra-ui/react'

import Avatar from 'components/Player/Avatar'

import thanosSnap from 'images/thanosSnap.gif'

import { motion, useAnimation } from 'framer-motion'

const MotionImage = motion(Image)

export default function CutAnimationSnap ({ onFinish }) {
  const lobby = useLobby()

  const gauntletControls = useAnimation()
  const cutPlayerControls = useAnimation()
  const gotCutPlayerControls = useAnimation()

  const cutPlayer = lobby.getPlayer(lobby.table.turn)
  const { avatarPos: cutPlayerPos } = lobby.getPlayerPositions(lobby.table.turn)

  const gotCutPlayer = lobby.getPlayer(lobby.table.gotCut.playerID)
  const { avatarPos: gotCutPlayerPos } = lobby.getPlayerPositions(lobby.table.gotCut.playerID)

  useEffect(() => {
    (async () => {
      await gauntletControls.start({
        opacity: 1,
        scale: 3.5,
        transition: { delay: 0.5, duration: 2 }
      })
      await gotCutPlayerControls.start({
        opacity: 0,
        transition: { duration: 3 }
      })
      await gauntletControls.start({
        scale: 1.5,
        opacity: 0,
        transition: { duration: 1 }
      })
      gotCutPlayerControls.start({
        opacity: 1,
        transition: { duration: 1 }
      })
      onFinish()
    })() // eslint-disable-next-line
  }, [])

  return (
    <>
      <MotionImage
        src={thanosSnap}
        width='12px'
        objectFit='contain'
        position='absolute'
        zIndex='10'
        animate={gauntletControls}
        initial={{ ...cutPlayerPos, opacity: 0, x: -30, y: 8 }}
      />
      <Avatar
        player={cutPlayer}
        position={cutPlayerPos}
        animate={cutPlayerControls}
      />
      <Avatar
        player={gotCutPlayer}
        position={gotCutPlayerPos}
        animate={gotCutPlayerControls}
      />
    </>
  )
}
