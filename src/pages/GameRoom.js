import { useEffect } from 'react'

import database from 'utils/firebase'

import {
  Box
} from '@chakra-ui/react'

export default function GameRoom ({ name }) {
  useEffect(() => {
    // find the room and check if the current user is joined
    database().ref(name).on('value', (snapshot) => {
      const room = snapshot.val()
      console.log(room)
    }, console.log)
  }, [])

  return (
    <Box>
      Game ROOM
    </Box>
  )
}
