import useServiceWorker from 'hooks/useServiceWorker'
import useFingerprint from 'hooks/useFingerprint'

import { useRoutes } from 'hookrouter'

import Home from 'pages/Home'
import LobbyManager from 'pages/LobbyManager'
import FindLobbies from 'pages/FindLobbies'
import CreateLobby from 'pages/CreateLobby'
import Background from 'components/Background'

const routes = {
  '/lobbies': () => <FindLobbies />,
  '/createLobby': () => <CreateLobby />,
  '/lobbies/:name': ({ name }) => <LobbyManager name={name} />
}

function App () {
  const routeResult = useRoutes(routes)

  useServiceWorker()
  useFingerprint()

  return (
    <Background hideText={window.location.pathname.startsWith('/lobbies/')}>
      {routeResult || <Home />}
    </Background>
  )
}

export default App
