import { useLobby } from 'context/LobbyContext'

import { Grid } from '@chakra-ui/react'

import LobbyHostOffline from 'components/TableContent/LobbyHostOffline'
import PreLobbyHost from 'components/TableContent/PreLobbyHost'
import PreLobbyGuest from 'components/TableContent/PreLobbyGuest'
import DealingAnimation from 'components/TableContent/DealingAnimation'
import DiscardPileAnimation from 'components/TableContent/DiscardPileAnimation'
import CutAnimation from 'components/TableContent/CutAnimation'
import EndGameAnimation from 'components/TableContent/EndGameAnimation'

import Player from 'components/Player'

import { motion } from 'framer-motion'
const MotionGrid = motion(Grid)

const rotate = (array, times) => {
  while (times--) {
    const temp = array.shift()
    array.push(temp)
  }
}

export default function Table () {
  const lobby = useLobby()

  const players = lobby.getPlayers()

  const myPlayerID = window.localStorage.getItem('playerID')

  const currentPlayerIndex = players.findIndex(({ playerID }) => playerID === myPlayerID)

  if (currentPlayerIndex >= 0) rotate(players, currentPlayerIndex)

  const positions = lobby.getSeatingPositions()

  return (
    <MotionGrid
      width='242px'
      height='470px'
      placeItems='center'
      background='linear-gradient(180deg, #363C67 0%, #2A2E54 100%)'
      boxShadow='0px 5px 6px 5px rgba(0, 0, 0, 0.25)'
      borderRadius='200px'
      position='relative'
      sx={{
        zoom: 1
      }}
      mt='-100px'
      initial={{ scale: 0 }}
      animate={{ scale: 1, transition: { delay: 0.3, duration: 0.2 } }}
    >
      <Grid
        width='215px'
        height='440px'
        background='linear-gradient(180deg, #464D86 0%, #2A2E54 100%)'
        boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
        borderRadius='200px'
        gridTemplateColumns='1fr 1fr'
        display='block'
      >
        <Grid
          w='100%'
          height='100%'
          placeItems='center'
          gridColumn='1/-1'
        >
          {lobby.lastOnline && <LobbyHostOffline />}
          {lobby.state === 'PRE_LOBBY' && myPlayerID === lobby.host && <PreLobbyHost />}
          {lobby.state === 'PRE_LOBBY' && myPlayerID !== lobby.host && <PreLobbyGuest />}
          {lobby.state === 'DEALING' && <DealingAnimation />}
          {lobby.gotCut && <CutAnimation />}
          {lobby.pileFull && <DiscardPileAnimation />}
          {lobby.donkey && <EndGameAnimation />}
        </Grid>
        {positions.map((positions, idx) => (
          <Grid key={idx} placeItems='center' width='100%' height='100%'>
            <Player player={players[idx]} positions={positions} />
          </Grid>
        ))}
      </Grid>
    </MotionGrid>
  )
}

/*
  TODO LIST:
  - BUG
    - disable clicking on cards in END GAME
  - Player settings
    - Host will have additional settings
      - actions
        - change nickname
        - Change max players
        - Change room pin ** v2
        - Change bot time
        - Kick player
        - change room host ** v2
        - Permanent ban player ** v2
      - viewing
        - show list of players
          - group by online, bots,  (** v2)
    - Normal player
      - change nickname
      - auto-bot mode
      - leave room
  - Spectator  ** v2
  - Find Lobbies
    - Disable if lobby is full
  - Join lobby  ** v2
    - Ask for pin if set  ** v2
  - Google login ** v2
  - Chat ** v2
  - Quick emojies for players (optional if time)
    - By clicking on player avatar, show some quick reactions - smileys
  - Got cutted UI
  - Table content UI
  - End Game UI
  - Check BOT bugs on end game
  - etc ...
*/
