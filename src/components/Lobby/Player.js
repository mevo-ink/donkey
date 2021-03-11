import { useContext } from 'react'

import {
  Grid,
  Text,
  Image
} from '@chakra-ui/react'

import HourGlass from 'components/Player/HourGlass'

import { LobbyContext } from 'utils/LobbyContext'

import { motion } from 'framer-motion'
const MotionGrid = motion(Grid)

export default function Player ({ player, position }) {
  const [lobby] = useContext(LobbyContext)

  return (
    <MotionGrid
      placeItems='center'
      position='absolute'
      {...position}
      initial={{ scale: 0 }}
      animate={{ scale: 1, transition: { delay: 0.3, duration: 0.3 } }}
    >
      {lobby.state === 'LOBBY' && !lobby.gotCuttedPlayerID && <HourGlass playerID={player.playerID} />}
      <Image
        src={player.avatar}
        w='40px'
        h='40px'
        borderRadius='50%'
        background='white'
      />
      <Text
        fontSize='16px'
        lineHeight='16px'
        textAlign='center'
        fontWeight='bold'
        width='100%'
        position='absolute'
        top='45px'
      >
        {player.nickname} {lobby.table?.cards ? `- ${Object.values(lobby.table.cards).filter(card => card.playerID === player.playerID).length}` : ''}
      </Text>
    </MotionGrid>
  )
}
