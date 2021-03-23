import { useLobby } from 'context/LobbyContext'

import { motion } from 'framer-motion'

import {
  Image
} from '@chakra-ui/react'

const MotionImage = motion(Image)

export default function CurrentCard ({ playerID, cardPos }) {
  const lobby = useLobby()
  return (
    <MotionImage
      width='40px'
      maxW='unset'
      objectFit='contain'
      src={lobby.getPlayerCardFromTableCards(playerID)?.url}
      position='absolute'
      zIndex='1'
      opacity={lobby.table.tableCardsFull || lobby.table.gotCut ? '0' : '1'}
      {...cardPos}
    />
  )
}
