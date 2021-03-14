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
  - BUG: Block joining if game already in progress
  - Copy to clipboard on room name click
  - RESPONSIVE TABLE FOR DESKTOP
  - Table content UI
  - End Game UI
    - ask host to reset game (goes to pre_lobby)
*/
