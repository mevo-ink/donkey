import useServiceWorker from 'hooks/useServiceWorker'
import useFingerprint from 'hooks/useFingerprint'

import { useRoutes } from 'hookrouter'

import {
  Box
} from '@chakra-ui/react'

import Home from 'pages/Home'
import FindRooms from 'pages/FindRooms'
import GameRoom from 'pages/GameRoom'

const routes = {
  '/rooms': FindRooms,
  '/rooms/:name': ({ name }) => <GameRoom name={name} />
}

function App () {
  const routeResult = useRoutes(routes)

  useServiceWorker()
  useFingerprint()

  return (
    <Box>
      {routeResult || <Home />}
    </Box>
  )
}

export default App

/* HOME - /: CREATE ROOM or FIND ROOM
   CREATE ROOM - INPUT username input, room name, limit, pin, ...etc and redirect to GAME ROOM
   FIND ROOMS - /rooms:  list all active rooms and let user to join one and redirect to GAME ROOM
   GAME ROOM - /rooms/<name>
      - case 1: if user is not in this room - JOIN ROOM asking username
      - case 2: user already in room
      - MICHAM ...
*/
