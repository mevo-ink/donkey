import useUserDisconnect from 'hooks/useUserDisconnect'

import {
  Box,
  Grid,
  Text,
  Flex
} from '@chakra-ui/react'

import RoomOwnerOffline from 'components/GameRoom/RoomOwnerOffline'

import Table from 'components/GameLobby/Table'

import { motion } from 'framer-motion'

const MotionBox = motion(Box)

export default function Lobby ({ room }) {
  useUserDisconnect(room)

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

  const isRoomOwnerOnline = !room.lastOnline

  return (
    <Grid
      zIndex='0'
      placeItems='center'
      width='100%'
    >
      {!isRoomOwnerOnline && <RoomOwnerOffline room={room} />}
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
            Room Name:
          </Text>
          <Text fontSize='lg'>
            {room.name}
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
            {`${Object.keys(room.users).length} / ${room.maxPlayers}`}
          </Text>
        </MotionBox>
      </Flex>
      <Table room={room} />
    </Grid>
  )
}
