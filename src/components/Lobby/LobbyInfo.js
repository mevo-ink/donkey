import {
  Box,
  Text,
  Flex
} from '@chakra-ui/react'

import { motion } from 'framer-motion'

const MotionBox = motion(Box)

export default function LobbyInfo ({ lobby }) {
  return (
    <Flex
      width='100%'
      justifyContent='space-between'
      lineHeight='14px'
      fontWeight='bold'
      mb='54px'
      overflow='hidden'
      position='absolute'
      top='50px'
    >
      <MotionBox
        ml='16px'
        initial={{ x: -300 }}
        animate={{ x: 0, transition: { delay: 1, duration: 0.5 } }}
      >
        <Text fontSize='xs'>
          Lobby Name:
        </Text>
        <Text fontSize='lg'>
          {lobby.name}
        </Text>
      </MotionBox>
      <MotionBox
        mr='16px'
        textAlign='end'
        initial={{ x: 300 }}
        animate={{ x: 0, transition: { delay: 1, duration: 0.5 } }}
      >
        <Text fontSize='xs'>
          Players:
        </Text>
        <Text fontSize='lg'>
          {`${Object.keys(lobby.players).length} / ${lobby.maxPlayers}`}
        </Text>
      </MotionBox>
    </Flex>
  )
}
