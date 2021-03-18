import { useLobby } from 'context/LobbyContext'

import { Flex, Image } from '@chakra-ui/react'

import cardBack from 'images/cardBack.png'

import Player from 'components/Player'
import CutAnimation from 'components/TableContent/CutAnimation'
import PreLobbyHost from 'components/TableContent/PreLobbyHost'
import PreLobbyGuest from 'components/TableContent/PreLobbyGuest'
import DealingAnimation from 'components/TableContent/DealingAnimation'
import LobbyHostOffline from 'components/TableContent/LobbyHostOffline'
import EndGameAnimation from 'components/TableContent/EndGameAnimation'
import DiscardPileAnimation from 'components/TableContent/DiscardPileAnimation'

import { motion } from 'framer-motion'
const MotionFlex = motion(Flex)
const MotionImage = motion(Image)

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
    <MotionFlex
      width='242px'
      height='470px'
      justifyContent='center'
      alignItems='center'
      background='linear-gradient(180deg, #363C67 0%, #2A2E54 100%)'
      boxShadow='0px 5px 6px 5px rgba(0, 0, 0, 0.25)'
      borderRadius='200px'
      position='relative'
      sx={{
        zoom: { iphone5: 0.7, iphone6: 0.9, iphone8: 1, ipad: 1.5 }
      }}
      mt='-50px'
      initial={{ scale: 0 }}
      animate={{ scale: 1, transition: { duration: 0.5 } }}
    >
      <Flex
        width='215px'
        height='440px'
        justifyContent='center'
        alignItems='center'
        position='absolute'
        background='linear-gradient(180deg, #464D86 0%, #2A2E54 100%)'
        boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
        borderRadius='200px'
      >
        <Flex
          w='100%'
          height='100%'
          justifyContent='center'
          alignItems='center'
          position='relative'
        >
          {lobby.state === 'LOBBY' && !lobby.gotCut && lobby.table.discard &&
            <MotionImage
              src={cardBack}
              width='30px'
              objectFit='contain'
              zIndex='5'
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.4 } }}
            />}
          {lobby.lastOnline && <LobbyHostOffline />}
          {!lobby.lastOnline && lobby.state === 'PRE_LOBBY' && myPlayerID === lobby.host && <PreLobbyHost />}
          {!lobby.lastOnline && lobby.state === 'PRE_LOBBY' && myPlayerID !== lobby.host && <PreLobbyGuest />}
          {!lobby.lastOnline && lobby.state === 'DEALING' && <DealingAnimation />}
          {!lobby.lastOnline && lobby.pileFull && !lobby.gotCut && <DiscardPileAnimation />}
          {!lobby.lastOnline && lobby.gotCut && <CutAnimation zIndex='5' />}
          {!lobby.lastOnline && lobby.donkey && <EndGameAnimation />}
        </Flex>
        {positions.map((positions, idx) => (
          <Player key={idx} player={players[idx]} positions={positions} />
        ))}
      </Flex>
    </MotionFlex>
  )
}

/*
  TODO LIST:
  - BIG BUG - cards mudiya next player set aaavuthilla
  - SHOW 1 2 3 BADGES
  - Fix discard pile animation  -FLIP AND GO
  - Discard animation - Should come only from remaining players seats
  - CUT TEXT - BUBBLE _ I CUT (player)
  - BUGs:
    - Old lobbies are still showing on first Find Lobby click
    - react-infinity-gauntlet console.log errors and logs
  - Optimize images
*/
