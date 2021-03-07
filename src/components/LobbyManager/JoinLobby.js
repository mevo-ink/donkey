import { useState, useContext } from 'react'

import { useTitle } from 'hookrouter'

import Nickname from 'components/CreateLobby/Nickname'
import CancelDone from 'components/CreateLobby/CancelDone'

import {
  Text,
  Grid
} from '@chakra-ui/react'

import database from 'utils/firebase'
import { LobbyContext } from 'utils/LobbyContext'

import { AvatarGenerator } from 'random-avatar-generator'

export default function JoinRoom () {
  const [lobby] = useContext(LobbyContext)

  useTitle(lobby.name)

  /*
    TODO:
    useEffect - check for active firebase auth session
    if player session is active on firebase:
      - automatically join the lobby with that player's name as nickname

    https://firebase.google.com/docs/auth/web/start#set_an_authentication_state_observer_and_get_player_data

    https://firebase.google.com/docs/auth/web/auth-state-persistence#supported_types_of_auth_state_persistence
  */

  const [isLoading, setIsLoading] = useState(false)

  const [nickname, setNickname] = useState('')

  const onJoinRoom = (e) => {
    e.preventDefault()
    setIsLoading(true)
    const playerID = window.localStorage.getItem('playerID')
    const generator = new AvatarGenerator()
    const avatar = generator.generateRandomAvatar(playerID) + '&avatarStyle=Transparent'
    database().ref(`${lobby.name}/players/${playerID}`).update({
      playerID,
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
      as='form'
      onSubmit={onJoinRoom}
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
        {lobby.name}
      </Text>
      <Nickname nickname={nickname} onSubmit={setNickname} />
      <CancelDone isLoading={isLoading} nickname={nickname} />
    </Grid>
  )
}
