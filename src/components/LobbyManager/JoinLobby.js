import { useState } from 'react'

import { useSettings } from 'context/LobbyContext'
import { useTitle } from 'hookrouter'

import Nickname from 'components/CreateLobby/Nickname'
import CancelDone from 'components/CreateLobby/CancelDone'

import {
  Text,
  Grid
} from '@chakra-ui/react'

import database from 'utils/firebase'

import { AvatarGenerator } from 'random-avatar-generator'

export default function JoinRoom () {
  const settings = useSettings()

  useTitle(settings.name)

  const [isLoading, setIsLoading] = useState(false)

  const [nickname, setNickname] = useState('')

  const onJoinRoom = (e) => {
    e.preventDefault()
    setIsLoading(true)
    const myPlayerID = window.localStorage.getItem('playerID')
    const generator = new AvatarGenerator()
    const avatar = generator.generateRandomAvatar(myPlayerID) + '&avatarStyle=Transparent'
    database().ref(`${settings.name}/players/${myPlayerID}`).update({
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
        {settings.name}
      </Text>
      <Nickname nickname={nickname} onSubmit={setNickname} />
      <CancelDone isLoading={isLoading} nickname={nickname} />
    </Grid>
  )
}
