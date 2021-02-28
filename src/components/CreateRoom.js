import {
  Box,
  Button
} from '@chakra-ui/react'

import { generateSlug } from 'random-word-slugs'

import database from 'utils/firebase'

export default function CreateRoom () {
  const onCreateRoom = () => {
    const name = generateSlug()

    const visitorID = window.localStorage.getItem('visitorID')

    database().ref(name).set({ name, owner: visitorID })
  }

  return (
    <Box>
      <Button onClick={onCreateRoom}> CREAT ROOM </Button>
    </Box>
  )
}
