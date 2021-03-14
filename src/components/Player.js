import { useLobby } from 'context/LobbyContext'

import {
  Grid,
  Text,
  Image
} from '@chakra-ui/react'

import botImage from 'images/bot.png'

import HourGlass from 'components/Player/HourGlass'
import NicknamePopover from 'components/Player/NicknamePopover'

import { motion } from 'framer-motion'
const MotionGrid = motion(Grid)
const MotionImage = motion(Image)

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
      <MotionImage
        width='40px'
        maxW='unset'
        objectFit='contain'
        src={lobby.table?.pile && (Object.values(lobby.table.pile).find(card => card.playerID === player.playerID))?.url}
        position='absolute'
        initial={{ x: 0, y: 0, scale: 0 }}
        animate={{ ...cardPosition, scale: 1, transition: { duration: 1 } }}
        exit={{ scale: 0, transition: { duration: 1 } }}
      />
      {player.lastOnline &&
        <Image
          width='35px'
          maxW='unset'
          objectFit='contain'
          src={botImage}
          position='absolute'
        />}
      <Image
        src={player.avatar}
        w='31px'
        h='31px'
        borderRadius='50%'
        opacity={player.lastOnline ? '0' : '1'}
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
