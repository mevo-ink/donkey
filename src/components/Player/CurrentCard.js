import { useLobby } from 'context/LobbyContext'

import { motion } from 'framer-motion'

import {
  Image
} from '@chakra-ui/react'

const MotionImage = motion(Image)

export default function CurrentCard ({ playerID, position }) {
  const lobby = useLobby()

  return (
    <MotionImage
      width='40px'
      maxW='unset'
      objectFit='contain'
      src={lobby.getPlayerCardFromPile(playerID)?.url}
      position='absolute'
      initial={{ x: 0, y: 0, scale: 0 }}
      animate={{ ...position, scale: 1, transition: { duration: 1 } }}
      exit={{ scale: 0, transition: { duration: 1 } }}
    />
  )
}
