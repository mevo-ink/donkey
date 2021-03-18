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

  const isHostAndPreGame = lobby.amIHost() && lobby.table.state === 'PREGAME'

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
        {isHostAndPreGame && <ShareLobby />}
        {!isHostAndPreGame && <Text fontSize='lg' mt='2px'> {`${lobby.settings.name}`} </Text>}
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
        {isHostAndPreGame && <MaxPlayersPopover />}
        {!isHostAndPreGame && <Text fontSize='lg' mt='2px'> {`${lobby.getAllPlayers().length} / ${lobby.settings.maxPlayers}`} </Text>}
      </MotionBox>
    </Flex>
  )
}
