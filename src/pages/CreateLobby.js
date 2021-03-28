import { useState } from 'react'

import { useTitle } from 'hookrouter'

import Nickname from 'components/CreateLobby/Nickname'
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
  const [maxPlayers, setMaxPlayers] = useState(4)

  const generator = new AvatarGenerator()
  const myPlayerID = window.localStorage.getItem('playerID')
  const avatar = generator.generateRandomAvatar(myPlayerID) + '&avatarStyle=Transparent'

  const onCreateLobby = (e) => {
    e.preventDefault()
    setIsLoading(true)
    const lobbyName = generateSlug()

    database().ref(`${lobbyName}`).set({
      settings: {
        name: lobbyName,
        host: {
          playerID: myPlayerID
        },
        maxPlayers,
        timeLimit: 20
      },
      players: {
        [myPlayerID]: { playerID: myPlayerID, nickname, avatar }
      },
      table: {
        state: 'PREGAME',
        seatings: [
          myPlayerID
        ]
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
        src={avatar}
        w='87px'
        h='87px'
        borderRadius='25px'
        background='rgba(255, 255, 255, 0.5)'
        boxShadow='0px 5px 6px rgba(0, 0, 0, 0.25)'
      />
      <Nickname nickname={nickname} onSubmit={setNickname} />
      <MaxPlayers maxPlayers={maxPlayers} onSubmit={setMaxPlayers} />
      <CancelDone onLoading={isLoading} nickname={nickname} />
    </Grid>
  )
}
