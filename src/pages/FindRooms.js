import { useEffect, useState } from 'react'

import { useTitle } from 'hookrouter'

import {
  Box,
  Text,
  VStack,
  CircularProgress
} from '@chakra-ui/react'

import Error from 'components/Error'

import RoomInfo from 'components/FindRooms/RoomInfo'

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
      setIsLoading(false)
    }, setError)
  }, [])

  if (error) {
    return <Error error={error} />
  }

  if (isLoading) {
    return <CircularProgress isIndeterminate color='purple.300' thickness='16px' />
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
      <VStack spacing={4}>
        {rooms.map(room => <RoomInfo key={room.name} room={room} />)}
      </VStack>
    </Box>
  )
}
