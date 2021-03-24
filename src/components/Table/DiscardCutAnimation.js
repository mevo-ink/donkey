import { useEffect } from 'react'

import { motion, useAnimation } from 'framer-motion'

import { useLobby } from 'context/LobbyContext'

import { Image } from '@chakra-ui/react'

const MotionImage = motion(Image)

export default function DiscardCutAnimation () {
  const lobby = useLobby()

  const controls = useAnimation()

  useEffect(() => {
    (async () => {
      if (lobby.table.gotCut.hasEnded) {
        const { avatarPos } = lobby.getPlayerPositions(lobby.table.gotCut.playerID)
        await controls.start({
          ...avatarPos,
          scale: [1, 0],
          opacity: [1, 0],
          transition: { duration: 0.8 }
        })
        // update state
        await lobby.onCutAnimationEnd()
      }
    })() // eslint-disable-next-line
  }, [lobby.table.gotCut.hasEnded])

  return lobby.getTableCards().map(tableCard => {
    const { cardPos } = lobby.getPlayerPositions(tableCard.playerID)
    return (
      <MotionImage
        key={tableCard.cardID}
        src={tableCard.url}
        width='40px'
        objectFit='contain'
        position='absolute'
        sx={{
          webkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden'
        }}
        {...cardPos}
        animate={controls}
      />
    )
  })
}
