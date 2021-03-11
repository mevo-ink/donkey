import { usePlayers } from 'context/LobbyContext'

import { Image } from '@chakra-ui/react'

import spinningCard from 'images/rotatingCardGif.gif'

import { motion } from 'framer-motion'
const MotionImage = motion(Image)

export default function Dealing () {
  const { onlinePlayers } = usePlayers()

  const numberOfPlayers = onlinePlayers.length

  const position = [
    { x: 0, y: 222 },
    { x: -80, y: 170 },
    { x: -91, y: 93 },
    { x: -91, y: -0 },
    { x: -91, y: -79 },
    { x: -80, y: -170 },
    { x: 0, y: -232 },
    { x: 80, y: -170 },
    { x: 90, y: -79 },
    { x: 90, y: -0 },
    { x: 90, y: 93 },
    { x: 80, y: 170 }
  ]

  const playersPosition = position.slice(0, (numberOfPlayers))

  const newPlayersPosition = []

  for (let i = 0; i < 52; i += numberOfPlayers) {
    newPlayersPosition.push(...playersPosition)
  }

  return (
    newPlayersPosition.map((pos, idx) => (
      <MotionImage
        key={idx}
        src={spinningCard}
        width='20px'
        objectFit='contain'
        position='absolute'
        initial={{ opacity: 0, x: 0, y: 0 }}
        animate={{ opacity: [0, 1, 0], x: pos.x, y: pos.y, transition: { delay: (1 + idx) / 2, duration: 0.2 } }}
      />
    ))
  )
}
