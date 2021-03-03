import { useState, useEffect } from 'react'

import LoadingRoom from 'components/GameRoom/LoadingRoom'
import RoomNotFound from 'components/GameRoom/RoomNotFound'
import RoomIsFull from 'components/GameRoom/RoomIsFull'
import JoinRoom from 'components/GameRoom/JoinRoom'

import Lobby from 'components/GameLobby/Lobby'

import Error from 'components/Error'

import database from 'utils/firebase'

export default function GameRoom ({ name }) {
  const visitorID = window.localStorage.getItem('visitorID')

  const [isLoading, setIsLoading] = useState(true)

  const [error, setError] = useState(false)

  const [room, setRoom] = useState({})

  useEffect(() => {
    // find the room
    database().ref(name).on('value', (snapshot) => {
      setRoom(snapshot.val())
      setIsLoading(false)
    }, setError)
  }, [])

  if (isLoading) return <LoadingRoom />

  if (error) return <Error error={error} />

  if (!room) return <RoomNotFound name={name} />

  // check if the current user is in the room
  const currentUser = room && room.users && room.users[visitorID]

  if (!currentUser) {
    // check if room is full
    if (room.maxPlayers === Object.keys(room.users).length) {
      return <RoomIsFull room={room} />
    } else {
      // prompt the user to join
      return <JoinRoom room={room} />
    }
  }

  return <Lobby room={room} />
}
