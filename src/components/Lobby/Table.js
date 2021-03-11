import { usePlayers } from 'context/LobbyContext'

import { Grid } from '@chakra-ui/react'

import Pile from 'components/Pile'
import Player from 'components/Player'

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
    { bottom: '-10px' },
    { left: '21px', bottom: '19px' },
    { left: '-13px', bottom: '108px' },
    { left: '-13px' },
    { left: '-13px', top: '108px' },
    { left: '22px', top: '33px' },
    { top: '-10px' },
    { right: '21px', top: '19px' },
    { right: '-13px', top: '108px' },
    { right: '-13px' },
    { right: '-13px', bottom: '108px' },
    { right: '22px', bottom: '33px' }
  ]
}

export default function Table ({ tableContent }) {
  const { onlinePlayers } = usePlayers()

  const playerID = window.localStorage.getItem('playerID')

  const currentPlayerIndex = onlinePlayers.findIndex(player => player.playerID === playerID)

  if (currentPlayerIndex >= 0) rotate(onlinePlayers, currentPlayerIndex)

  const positions = getPositions(onlinePlayers.length)

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
        {onlinePlayers.map((player, idx) => (
          <Grid key={player.playerID} placeItems='center'>
            <Player player={player} position={positions[idx]} />
            <Pile player={player} position={positions[idx]} idx={idx} />
          </Grid>
        ))}
      </Grid>
    </MotionGrid>
  )
}
