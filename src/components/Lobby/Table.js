import { useContext } from 'react'
import { LobbyContext } from 'utils/LobbyContext'

import { Grid } from '@chakra-ui/react'

import Player from 'components/Lobby/Player'

import { motion } from 'framer-motion'
const MotionGrid = motion(Grid)

const rotate = (array, times) => {
  while (times--) {
    const temp = array.shift()
    array.push(temp)
  }
}

const getPositions = (count) => {
  // 12
  return [
    { left: '105px', bottom: '-17px' },
    { left: '22px', top: '415px' },
    { left: '-9px', top: '318px' },
    { left: '-9px', top: '220px' },
    { left: '-9px', top: '126px' },
    { left: '22px', top: '33px' },
    { right: '105px', top: '-7px' },
    { right: '22px', top: '33px' },
    { right: '-9px', top: '126px' },
    { right: '-9px', top: '220px' },
    { right: '-9px', top: '318px' },
    { right: '22px', top: '415px' }
  ]
  // 4
  // return [
  //   { left: '105px', bottom: '-17px' },
  //   // { left: '22px', top: '415px' },
  //   // { left: '-9px', top: '318px' },
  //   { left: '-9px', top: '220px' },
  //   // { left: '-9px', top: '126px' },
  //   // { left: '22px', top: '33px' },
  //   { right: '105px', top: '-7px' },
  //   // { right: '22px', top: '33px' },
  //   // { right: '-9px', top: '126px' },
  //   { right: '-9px', top: '220px' },
  //   // { right: '-9px', top: '318px' },
  //   // { right: '22px', top: '415px' }
  // ]
}

export default function Table ({ tableContent }) {
  const [lobby] = useContext(LobbyContext)

  const playerID = window.localStorage.getItem('playerID')

  const players = Object.values(lobby.players)

  const currentPlayerIndex = players.findIndex(player => player.playerID === playerID)

  if (currentPlayerIndex >= 0) rotate(players, currentPlayerIndex)

  const positions = getPositions(players.length)

  return (
    <MotionGrid
      width='242px'
      height='470px'
      placeItems='center'
      background='linear-gradient(180deg, #363C67 0%, #2A2E54 100%)'
      boxShadow='0px 5px 6px 5px rgba(0, 0, 0, 0.25)'
      borderRadius='200px'
      position='relative'
      initial={{ scale: 0 }}
      animate={{ scale: 1, transition: { delay: 0.3, duration: 0.2 } }}
    >
      <Grid
        width='215px'
        height='440px'
        placeItems='center'
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
          {tableContent}
        </Grid>
        {players.map((player, idx) => (
          <Grid key={player.playerID}>
            <Player player={player} position={positions[idx]} />
          </Grid>
        ))}
      </Grid>
    </MotionGrid>
  )
}
