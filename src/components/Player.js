import { useLobby } from 'context/LobbyContext'

import {
  Grid,
  Text,
  Image
} from '@chakra-ui/react'

import HourGlass from 'components/Player/HourGlass'
import NicknamePopover from 'components/Player/NicknamePopover'

import { motion } from 'framer-motion'
const MotionGrid = motion(Grid)

export default function Player ({ player, positions: [playerPosition, cardPosition] = [] }) {
  const lobby = useLobby()

  return (
    <MotionGrid
      placeItems='center'
      position='absolute'
      {...playerPosition}
      initial={{ scale: 0 }}
      animate={{ scale: 1, transition: { delay: 0.3, duration: 0.3 } }}
    >
      {lobby.state === 'LOBBY' && !lobby.gotCut && !lobby.pileFull && <HourGlass playerID={player.playerID} />}
      <Image
        width='40px'
        maxW='unset'
        objectFit='contain'
        src={lobby.table?.pile && (Object.values(lobby.table.pile).find(card => card.playerID === player.playerID))?.url}
        position='absolute'
        {...cardPosition}
      />
      <Image
        src={player.avatar}
        w='31px'
        h='31px'
        borderRadius='50%'
        // background='black'
      />
      <NicknamePopover>
        <Text
          fontSize='16px'
          lineHeight='16px'
          textAlign='center'
          fontWeight='bold'
          width='100%'
          position='absolute'
          top='34px'
        >
          {player.nickname} {lobby.table?.cards ? `- ${Object.values(lobby.table.cards).filter(card => card.playerID === player.playerID).length}` : ''}
        </Text>
      </NicknamePopover>
    </MotionGrid>
  )
}
