import { useState } from 'react'

import { useLobby } from 'context/LobbyContext'
import { useTitle } from 'hookrouter'

import Nickname from 'components/CreateLobby/Nickname'
import CancelDone from 'components/CreateLobby/CancelDone'

import {
  Text,
  Grid
} from '@chakra-ui/react'

import database from 'utils/firebase'

import { AvatarGenerator } from 'random-avatar-generator'

export default function JoinLobby () {
  const lobby = useLobby()

  useTitle(lobby.settings.name)

  const [isLoading, setIsLoading] = useState(false)

  const [nickname, setNickname] = useState('')

  const onJoinLobby = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const myPlayerID = window.localStorage.getItem('playerID')
    const generator = new AvatarGenerator()
    const avatar = generator.generateRandomAvatar(myPlayerID) + '&avatarStyle=Transparent'
    await database().ref(`${lobby.settings.name}/table/seatings`).push(myPlayerID)
    await database().ref(`${lobby.settings.name}/players/${myPlayerID}`).update({
      playerID: myPlayerID,
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
      onSubmit={onJoinLobby}
    >
      <Text
        width='100%'
        fontSize='12px'
        lineHeight='12px'
        fontWeight='normal'
      >
        Lobby Name:
      </Text>
      <Text
        fontSize='35px'
        lineHeight='35px'
        mb='15px'
      >
        {lobby.settings.name}
      </Text>
      <Nickname nickname={nickname} onSubmit={setNickname} />
      <CancelDone isLoading={isLoading} nickname={nickname} />
    </Grid>
  )
}
