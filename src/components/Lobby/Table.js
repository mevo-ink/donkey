import { usePlayers } from 'context/LobbyContext'

import { Grid } from '@chakra-ui/react'

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
    [{ bottom: '-10px' }, { bottom: '90px' }],
    [{ left: '21px', bottom: '19px' }, { left: '28px', bottom: '28px' }],
    [{ left: '-13px', bottom: '108px' }, { }],
    [{ top: '50%', left: '-13px' }, { }],
    [{ left: '-13px', top: '108px' }, { }],
    [{ left: '22px', top: '33px' }, { }],
    [{ top: '-10px' }, { }],
    [{ right: '21px', top: '19px' }, { }],
    [{ right: '-13px', top: '108px' }, { }],
    [{ bottom: '50%', right: '-13px' }, { }],
    [{ right: '-13px', bottom: '108px' }, { }],
    [{ right: '22px', bottom: '33px' }, { }]
  ]
}

export default function Table ({ tableContent }) {
  const { onlinePlayers } = usePlayers()

  const myPlayerID = window.localStorage.getItem('playerID')

  const currentPlayerIndex = onlinePlayers.findIndex(({ playerID }) => playerID === myPlayerID)

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
            <Player player={player} positions={positions[idx]} />
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
