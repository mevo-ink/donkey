import useUserDisconnect from 'hooks/usePlayerDisconnect'

import preloadCardImages from 'utils/cards'

import {
  Box,
  Grid,
  Text,
  Flex
} from '@chakra-ui/react'

import LobbyHostOffline from 'components/LobbyAlerts/LobbyHostOffline'

import Table from 'components/Lobby/Table'

import { motion } from 'framer-motion'
import { useEffect } from 'react'

const MotionBox = motion(Box)

export default function PreLobby ({ lobby }) {
  useUserDisconnect(lobby)

  useEffect(() => {
    preloadCardImages()
  }, [])

  /*
  THIS WILL BE WHERE ALL THE GAME SPECIFIC LOGIC AND LAYOUT WILL HAPPEN
  rough components layout
    - Settings Drawer - bottom left?
    - Quick chat button - bottom right?
    - Table - center layout
        - CurrentUserBubble
             - CardsFan
             - chat bubble
        - OtherUserBubble
            - chat bubble
      ... etc
  */

  const isLobbyHostOnline = !lobby.lastOnline

  return (
    <Grid
      zIndex='0'
      placeItems='center'
      width='100%'
    >
      {!isLobbyHostOnline && <LobbyHostOffline lobby={lobby} />}
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
      <Table lobby={lobby} />
    </Grid>
  )
}
