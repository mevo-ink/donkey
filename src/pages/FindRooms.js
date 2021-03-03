import { useEffect, useState } from 'react'

import { useTitle } from 'hookrouter'

import {
  Box,
  Text,
  Icon,
  VStack
} from '@chakra-ui/react'

import Error from 'components/Error'

import RoomInfo from 'components/FindRooms/RoomInfo'

import Loading from 'components/Loading'

import database from 'utils/firebase'

export default function FindRooms () {
  useTitle('Find Rooms')

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  const [rooms, setRooms] = useState([])

  useEffect(() => {
    database().ref().on('value', async (snapshot) => {
      const rooms = Object.values(snapshot.val())
      setRooms(rooms)
      // delete rooms if inactive for more than 15 mins
      if (rooms) {
        for (const room of Object.values(rooms)) {
          const currentTime = new Date().getTime()
          if (parseInt((currentTime - room.lastOnline) / 1000) > 900) {
            database().ref(room.name).set(null)
          }
        }
      }
      setTimeout(() => setIsLoading(false), 1000)
    }, setError)
  }, [])

  if (error) {
    return <Error error={error} />
  }

  if (isLoading) {
    return <Loading marginTop='-100px' />
  }

  return (
    <Box
      width='200px'
      zIndex='0'
      mt='-57px'
    >
      <Text
        fontSize='48px'
        lineHeight='48px'
        fontWeight='bold'
        mb='15px'
      >
        Rooms
      </Text>
      <VStack
        spacing={4}
        height='395px'
        overflowY='scroll'
        css={{
          '&::-webkit-scrollbar': {
            width: '0px'
          }
        }}
      >
        {rooms.map(room => <RoomInfo key={room.name} room={room} />)}
      </VStack>
      {rooms && (
        <Box width='100%' textAlign='center'>
          <Icon width='15px' height='9px' viewBox='0 0 15 9' fill='none'>
            <path d='M0 1.698L1.76812 0L7.5025 5.6034L13.2319 0L15 1.698L7.5025 9L0 1.698Z' fill='white' fillOpacity='0.7' />
          </Icon>
        </Box>
      )}
    </Box>
  )
}
