import { useContext } from 'react'

import { Image } from '@chakra-ui/react'

import { LobbyContext } from 'utils/LobbyContext'

import spinningCard from 'images/rotatingCardGif.gif'

import { motion } from 'framer-motion'
const MotionImage = motion(Image)

export default function Dealing () {
  const [lobby] = useContext(LobbyContext)

  const numberOfPlayers = Object.values(lobby.players).length

  const position = [
    { x: 0, y: 202 },
    { x: -60, y: 170 },
    { x: -91, y: 73 },
    { x: -91, y: -0 },
    { x: -91, y: -59 },
    { x: -60, y: -170 },
    { x: 0, y: -202 },
    { x: 59, y: -170 },
    { x: 90, y: -59 },
    { x: 90, y: -0 },
    { x: 90, y: 73 },
    { x: 59, y: 170 }
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
        animate={{ opacity: 1, x: pos.x, y: pos.y, transition: { delay: 1 + idx, duration: 0.2 } }}
      />
    ))
  )
}
