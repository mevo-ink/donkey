import { useState } from 'react'

import { useTitle } from 'hookrouter'

import Nickname from 'components/CreateRoom/Nickname'

import {
  Text,
  Grid,
  Button
} from '@chakra-ui/react'

import database from 'utils/firebase'

export default function JoinRoom ({ room }) {
  useTitle(room.name)

  /*
    TODO:
    useEffect - check for active firebase auth session
    if user session is active on firebase:
      - automatically join the room with that user's name as nickname

    https://firebase.google.com/docs/auth/web/start#set_an_authentication_state_observer_and_get_user_data

    https://firebase.google.com/docs/auth/web/auth-state-persistence#supported_types_of_auth_state_persistence
  */

  const [isLoading, setIsLoading] = useState(false)

  const [nickname, setNickname] = useState('')

  const onJoinRoom = (e) => {
    e.preventDefault()
    setIsLoading(true)
    const visitorID = window.localStorage.getItem('visitorID')
    database().ref(`${room.name}/users/${visitorID}`).update({ visitorID, nickname })
  }

  return (
    <Grid
      position='absolute'
      placeItems='center'
      fontSize='18px'
      lineHeight='18px'
      fontWeight='bold'
      as='form'
      onSubmit={onJoinRoom}
    >
      <Text
        fontSize='48px'
        lineHeight='48px'
        fontWeight='bold'
        mb='15px'
      >
        {room.name}
      </Text>
      <Nickname nickname={nickname} onSubmit={setNickname} />
      <Button
        mt={8}
        bg='linear-gradient(180deg, #E3E3E3 0%, #C2C2C2 100%)'
        color='black'
        type='submit'
        isDisabled={!nickname}
        isLoading={isLoading}
      >
        JOIN ROOM
      </Button>
    </Grid>
  )
}
