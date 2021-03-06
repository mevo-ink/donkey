import { useState } from 'react'

import { useTitle } from 'hookrouter'

import Nickname from 'components/CreateLobby/Nickname'
import LobbyPin from 'components/CreateLobby/LobbyPin'
import MaxPlayers from 'components/CreateLobby/MaxPlayers'
import CancelDone from 'components/CreateLobby/CancelDone'

import {
  Grid,
  Image
} from '@chakra-ui/react'

import { AvatarGenerator } from 'random-avatar-generator'

import { generateSlug } from 'random-word-slugs'

import database from 'utils/firebase'

export default function CreateLobby () {
  useTitle('Create Lobby')

  const [isLoading, setIsLoading] = useState(false)

  const [nickname, setNickname] = useState('')
  const [pin, setPin] = useState()
  const [maxPlayers, setMaxPlayers] = useState(2)

  const onCreateLobby = (e) => {
    e.preventDefault()
    setIsLoading(true)
    const lobbyName = generateSlug()
    const playerID = window.localStorage.getItem('playerID')
    const generator = new AvatarGenerator()
    const avatar = generator.generateRandomAvatar(playerID) + '&avatarStyle=Transparent'
    database().ref(lobbyName).set({
      name: lobbyName,
      host: playerID,
      state: 'PRE_LOBBY',
      maxPlayers,
      players: {
        [playerID]: { playerID, nickname, avatar }
      }
    })
      .then(() => { window.location.href = `/lobbies/${lobbyName}` })
      .finally(() => setIsLoading(false))
  }

  return (
    <Grid
      position='absolute'
      placeItems='center'
      fontSize='18px'
      lineHeight='18px'
      fontWeight='bold'
      as='form'
      onSubmit={onCreateLobby}
    >
      <Image
        src='https://i.pinimg.com/originals/10/40/09/104009be202e45fd75e7466de2036f4f.jpg'
        w='87px'
        h='87px'
        borderRadius='25px'
        boxShadow='0px 5px 6px rgba(0, 0, 0, 0.25)'
      />
      <Nickname nickname={nickname} onSubmit={setNickname} />
      <LobbyPin pin={pin} onSubmit={setPin} />
      <MaxPlayers maxPlayers={maxPlayers} onSubmit={setMaxPlayers} />
      <CancelDone onLoading={isLoading} nickname={nickname} />
    </Grid>
  )
}
