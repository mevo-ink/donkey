import useServiceWorker from 'hooks/useServiceWorker'
import useFingerprint from 'hooks/useFingerprint'

import { useRoutes } from 'hookrouter'

import PWAPrompt from 'components/PWAPrompt'

import Home from 'pages/Home'
import Lobby from 'pages/Lobby'
import FindLobbies from 'pages/FindLobbies'
import CreateLobby from 'pages/CreateLobby'
import Background from 'components/Background'

const routes = {
  '/lobbies': () => <FindLobbies />,
  '/createLobby': () => <CreateLobby />,
  '/lobbies/:name': ({ name }) => <Lobby name={name} />
}

function App () {
  const routeResult = useRoutes(routes)

  useServiceWorker()
  useFingerprint()

  const isLobby = window.location.pathname.startsWith('/lobbies/')
  if (isLobby) return routeResult

  return (
    <Background>
      <PWAPrompt />
      {routeResult || <Home />}
    </Background>
  )
}

export default App
