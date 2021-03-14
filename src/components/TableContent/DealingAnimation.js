import { useLobby } from 'context/LobbyContext'

import { Image } from '@chakra-ui/react'

import spinningCard from 'images/rotatingCardGif.gif'

import { motion } from 'framer-motion'
const MotionImage = motion(Image)

export default function DealingAnimation () {
  const lobby = useLobby()

  const players = lobby.getPlayers()

  const numberOfPlayers = players.length

  const playersPosition = lobby.getSeatingPositions().map(([_, __, playerPosition]) => playerPosition)

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
