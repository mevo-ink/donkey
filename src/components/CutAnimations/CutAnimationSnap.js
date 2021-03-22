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
      gotCutPlayerControls.start({
        scale: 1.5,
        transition: { delay: 0.5, duration: 0.5 }
      })
      cutPlayerControls.start({
        scale: 1.5,
        transition: { delay: 0.5, duration: 0.5 }
      })
      await gauntletControls.start({
        opacity: 1,
        y: 0,
        transition: { delay: 1.8, duration: 1 }
      })
      await gauntletControls.start({
        opacity: 0,
        transition: { delay: 0.5, duration: 0.5 }
      })
      await gotCutPlayerControls.start({
        opacity: 0,
        transition: { delay: 0.3, duration: 1.5 }
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
        initial={{ ...cutPlayerPos, opacity: 0, x: -20, y: -18, scale: 2 }}
        animate={gauntletControls}
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
