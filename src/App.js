import useServiceWorker from 'hooks/useServiceWorker'
import useFingerprint from 'hooks/useFingerprint'

import { useRoutes } from 'hookrouter'

import Home from 'pages/Home'
import GameRoom from 'pages/GameRoom'
import FindRooms from 'pages/FindRooms'
import CreateRoom from 'pages/CreateRoom'
import Background from 'components/Background'

const routes = {
  '/rooms': () => <FindRooms />,
  '/createRoom': () => <CreateRoom />,
  '/rooms/:name': ({ name }) => <GameRoom name={name} />
}

function App () {
  const routeResult = useRoutes(routes)

  useServiceWorker()
  useFingerprint()

  return (
    <Background hideText={window.location.pathname.startsWith('/rooms/')}>
      {routeResult || <Home />}
    </Background>
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
