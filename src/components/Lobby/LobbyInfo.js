import { useLobby } from 'context/LobbyContext'

import {
  Box,
  Text,
  Flex
} from '@chakra-ui/react'

import ShareLobby from 'components/Lobby/ShareLobby'
import MaxPlayersPopover from 'components/Lobby/MaxPlayersPopover'

import { motion } from 'framer-motion'
const MotionBox = motion(Box)

export default function LobbyInfo () {
  const lobby = useLobby()

  const isHostAndPreLobby = window.localStorage.getItem('playerID') === lobby.host && lobby.state === 'PRE_LOBBY'

  return (
    <Flex
      width='100%'
      justifyContent='space-between'
      lineHeight='14px'
      fontWeight='bold'
      mb='54px'
      position='absolute'
      top='25px'
      overflow='inherit'
    >
      <MotionBox
        ml='16px'
        initial={{ x: -300 }}
        animate={{ x: 0, transition: { delay: 1, duration: 0.5 } }}
      >
        <Text fontSize='xs'>
          Lobby Name:
        </Text>
        {isHostAndPreLobby && <ShareLobby />}
        {!isHostAndPreLobby && <Text fontSize='lg' mt='2px'> {`${lobby.name}`} </Text>}
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
        {isHostAndPreLobby && <MaxPlayersPopover />}
        {!isHostAndPreLobby && <Text fontSize='lg' mt='2px'> {`${lobby.getPlayers().length} / ${lobby.maxPlayers}`} </Text>}
      </MotionBox>
    </Flex>
  )
}
