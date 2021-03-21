import { useEffect } from 'react'

import { useLobby } from 'context/LobbyContext'

import { Image } from '@chakra-ui/react'

import Avatar from 'components/Player/Avatar'

import thanosSnap from 'images/thanosSnap.gif'

import { motion, useAnimation } from 'framer-motion'

const DustCanvas = motion('canvas')

const variants = {
  visible: {
    opacity: 1,
    transition: { duration: 2000 },
    filter: 'blur(0)',
    y: 0,
    x: 0,
    rotate: 0
  },
  hidden: {
    opacity: 0,
    y: (props) => props.y,
    x: (props) => props.x,
    rotate: (props) => props.rotate,
    transition: { duration: 2000 },
    filter: 'blur(2px)'
  }
}

const MotionImage = motion(Image)

export default function CutAnimationSnap ({ onFinish }) {
  const lobby = useLobby()

  const cutPlayerControls = useAnimation()
  const gotCutPlayerControls = useAnimation()

  const cutPlayer = lobby.getPlayer(lobby.table.turn)
  const { avatarPos: cutPlayerPos } = lobby.getPlayerPositions(lobby.table.turn)

  const gotCutPlayer = lobby.getPlayer(lobby.table.gotCut.playerID)
  const { avatarPos: gotCutPlayerPos } = lobby.getPlayerPositions(lobby.table.gotCut.playerID)

  useEffect(() => {
    (async () => {
      await Promise.all([
        cutPlayerControls.start({
          scale: 3,
          transition: { duration: 1 }
        }),
        gotCutPlayerControls.start({
          scale: 3,
          transition: { duration: 1 }
        })
      ])
      // onFinish()
      // await lobby.onCutAnimationEnd()
    })() // eslint-disable-next-line
  }, [])

  return (
    <>
      <MotionImage
        src={thanosSnap}
        width='16px'
        objectFit='contain'
        position='absolute'
        zIndex='10'
        initial={{ ...cutPlayerPos, opacity: 0, x: -15, y: 8 }}
        animate={{ opacity: 1, transition: { delay: 0.8, duration: 0.4 } }}
      />

      <Avatar player={cutPlayer} position={cutPlayerPos} animate={cutPlayerControls} />
      <DustCanvas
        variants={variants}
        initial='visible'
        animate='hidden'
      >
        <Avatar player={gotCutPlayer} position={gotCutPlayerPos} animate={gotCutPlayerControls} />
      </DustCanvas>
    </>
  )
}
