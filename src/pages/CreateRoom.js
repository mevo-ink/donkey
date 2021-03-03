import { useState } from 'react'

import { useTitle } from 'hookrouter'

import Nickname from 'components/CreateRoom/Nickname'
import RoomPin from 'components/CreateRoom/RoomPin'
import MaxPlayers from 'components/CreateRoom/MaxPlayers'
import CancelDone from 'components/CreateRoom/CancelDone'

import {
  Grid,
  Image
} from '@chakra-ui/react'

import { generateSlug } from 'random-word-slugs'

import database from 'utils/firebase'

export default function CreateRoom () {
  useTitle('Create Room')

  const [isLoading, setIsLoading] = useState(false)

  const [nickname, setNickname] = useState('')
  const [pin, setPin] = useState()
  const [maxPlayers, setMaxPlayers] = useState(1)

  const onCreateRoom = () => {
    setIsLoading(true)
    const roomName = generateSlug()
    const visitorID = window.localStorage.getItem('visitorID')
    database().ref(roomName).set({
      name: roomName,
      owner: visitorID,
      state: 'LOBBY',
      maxPlayers,
      users: {
        [visitorID]: {
          visitorID, nickname, avatar: 'https://i.pravatar.cc/300'
        }
      }
    })
      .then(() => { window.location.href = `/rooms/${roomName}` })
      .finally(() => setIsLoading(false))
  }

  return (
    <Grid
      position='absolute'
      placeItems='center'
      fontSize='18px'
      lineHeight='18px'
      fontWeight='bold'
    >
      <Image
        src='https://i.pinimg.com/originals/10/40/09/104009be202e45fd75e7466de2036f4f.jpg'
        w='87px'
        h='87px'
        borderRadius='25px'
        boxShadow='0px 5px 6px rgba(0, 0, 0, 0.25)'
      />
      <Nickname nickname={nickname} onSubmit={setNickname} />
      <RoomPin pin={pin} onSubmit={setPin} />
      <MaxPlayers maxPlayers={maxPlayers} onSubmit={setMaxPlayers} />
      <CancelDone onLoading={isLoading} onCreateRoom={onCreateRoom} nickname={nickname} />
    </Grid>
  )
}
