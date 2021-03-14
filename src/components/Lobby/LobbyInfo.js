import { useLobby } from 'context/LobbyContext'

import {
  Box,
  Text,
  Flex,
  Button
} from '@chakra-ui/react'

import MaxPlayersPopover from 'components/Lobby/MaxPlayersPopover'

import { motion } from 'framer-motion'
const MotionBox = motion(Box)

export default function LobbyInfo () {
  const lobby = useLobby()

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
        <Text
          fontSize='lg'
          mt='2px'
        >
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
        {window.localStorage.getItem('playerID') === lobby.host && lobby.state === 'PRE_LOBBY'
          // eslint-disable-next-line
          ?
            <MaxPlayersPopover>
              <Button
                width='auto'
                height='20px'
                minWidth='0px'
                minHeight='0px'
                color='black'
                bg='linear-gradient(180deg, #E3E3E3 0%, #C2C2C2 100%)'
                boxShadow='0px 5px 6px rgba(0, 0, 0, 0.25)'
                borderRadius='5px'
                fontSize='18px'
                lineHeight='18px'
                fontWeight='bold'
                p='0px 5px'
                _active={{ bg: '' }}
                _hover={{ bg: '' }}
              >
                {`${Object.keys(lobby.players).length} / ${lobby.maxPlayers}`}
              </Button>
            </MaxPlayersPopover>
          // eslint-disable-next-line
          :
            <Text
              fontSize='lg'
              mt='2px'
            >
              {`${Object.keys(lobby.players).length} / ${lobby.maxPlayers}`}
            </Text>}
      </MotionBox>
    </Flex>
  )
}
