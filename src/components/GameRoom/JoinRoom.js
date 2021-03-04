import { useState } from 'react'

import { useTitle } from 'hookrouter'

import Nickname from 'components/CreateRoom/Nickname'
import CancelDone from 'components/CreateRoom/CancelDone'

import {
  Text,
  Grid
} from '@chakra-ui/react'

import database from 'utils/firebase'

import { AvatarGenerator } from 'random-avatar-generator'

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
    const generator = new AvatarGenerator()
    const avatar = generator.generateRandomAvatar(visitorID) + '&avatarStyle=Transparent'
    database().ref(`${room.name}/users/${visitorID}`).update({
      visitorID,
      nickname,
      avatar
    })
  }

  return (
    <Grid
      placeItems='center'
      fontSize='18px'
      lineHeight='18px'
      fontWeight='bold'
    >
      <Text
        width='100%'
        fontSize='12px'
        lineHeight='12px'
        fontWeight='normal'
      >
        Room Name
      </Text>
      <Text
        fontSize='35px'
        lineHeight='35px'
        mb='15px'
      >
        {room.name}
      </Text>
      <Nickname nickname={nickname} onSubmit={setNickname} />
      <CancelDone isLoading={isLoading} onSubmit={onJoinRoom} nickname={nickname} />
    </Grid>
  )
}
