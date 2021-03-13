import { useEffect } from 'react'

import database from 'utils/firebase'

import { useLobby } from 'context/LobbyContext'

import { Grid, Text } from '@chakra-ui/react'

import Player from 'components/Player'

import { motion } from 'framer-motion'
const MotionGrid = motion(Grid)

const rotate = (array, times) => {
  while (times--) {
    const temp = array.shift()
    array.push(temp)
  }
}

const getSeatingPositions = (count) => {
  return {
    1: [0],
    2: [0, 6],
    3: [0, 3, 9],
    4: [0, 3, 6, 9],
    5: [0, 3, 6, 8, 10],
    6: [0, 2, 4, 6, 8, 10],
    7: [0, 2, 4, 6, 8, 9, 10],
    8: [0, 2, 3, 4, 6, 8, 9, 10],
    9: [0, 1, 2, 3, 4, 6, 8, 9, 10],
    10: [0, 1, 2, 3, 4, 5, 6, 8, 9, 10],
    11: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    12: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  }[count]
}

const getPositions = (count) => {
  // const AVATAR_OFFSET = 16.5
  const seatingPositions = getSeatingPositions(count)
  // const EDGE = `${-AVATAR_OFFSET / 2}px`
  return [
    [{ bottom: '-10px' }, { bottom: '45px' }],
    [{ left: '15px', bottom: '33px' }, { left: '40px', bottom: '33px' }],
    [{ left: '-10px', bottom: '120px' }, { left: '50px', bottom: '15px' }],
    [{ left: '-10px', top: '219.5px' }, { left: '42px' }],
    [{ left: '-10px', top: '120px' }, { left: '50px', top: '15px' }],
    [{ left: '15px', top: '33px' }, { left: '40px', top: '33px' }],
    [{ top: '-10px' }, { top: '45px' }],
    [{ right: '15px', top: '33px' }, { right: '40px', top: '33px' }],
    [{ right: '-10px', top: '120px' }, { right: '50px', top: '15px' }],
    [{ bottom: '219.5px', right: '-13px' }, { right: '42px' }],
    [{ right: '-10px', bottom: '120px' }, { right: '50px', bottom: '15px' }],
    [{ right: '15px', bottom: '33px' }, { right: '40px', bottom: '33px' }]
    // [{ bottom: EDGE }, { bottom: '45px' }],
    // [{ left: EDGE, bottom: `calc(16.67% - ${AVATAR_OFFSET}px)` }, { left: '29px', bottom: '33px' }],
    // [{ left: EDGE, bottom: `calc(33.34% - ${AVATAR_OFFSET}px)` }, { left: '42px', bottom: '28px' }],
    // [{ left: EDGE, top: `calc(50% - ${AVATAR_OFFSET}px)` }, { left: '42px' }],
    // [{ left: EDGE, top: `calc(16.67% - ${AVATAR_OFFSET}px)` }, { left: '42px', top: '28px' }],
    // [{ left: EDGE, top: `calc(33.34% - ${AVATAR_OFFSET}px)` }, { left: '29px', top: '33px' }],
    // [{ top: EDGE }, { top: '45px' }],
    // [{ right: EDGE, top: `calc(16.67% - ${AVATAR_OFFSET}px)` }, { right: '29px', top: '33px' }],
    // [{ right: EDGE, top: `calc(33.34% - ${AVATAR_OFFSET}px)` }, { right: '42px', top: '28px' }],
    // [{ bottom: `calc(50% - ${AVATAR_OFFSET}px)`, right: '-13px' }, { right: '42px' }],
    // [{ right: EDGE, bottom: `calc(16.67% - ${AVATAR_OFFSET}px)` }, { right: '42px', bottom: '28px' }],
    // [{ right: EDGE, bottom: `calc(33.34% - ${AVATAR_OFFSET}px)` }, { right: '29px', bottom: '33px' }]
  ].filter((_, idx) => seatingPositions.includes(idx))
}

const CutAnimation = () => {
  const lobby = useLobby()

  const gotCuttedPlayer = lobby.getPlayer(lobby.gotCut.playerID)

  useEffect(() => {
    setTimeout(() => {
      // move existing pile cards to the player who got cut
      lobby.movePileCardsToPlayer(lobby.gotCut.playerID)
      // add cut card to got cutted player's hand
      lobby.addCardToPlayer(lobby.gotCut.card, lobby.gotCut.playerID)
      // change turn
      lobby.changeTurn(lobby.gotCut.playerID)
      // update firebase
      database().ref(`${lobby.name}/table`).set(lobby.table)
      database().ref(`${lobby.name}/gotCut`).set(null)
      // check for winning condition
      if (lobby.isEndGame()) {
        lobby.emptyDiscard()
        database().ref(`${lobby.name}`).update({
          state: 'END_GAME',
          donkey: lobby.getPlayerIDsWithCards()[0]
        })
      }
    }, 5000) // eslint-disable-next-line
  }, [])

  return (
    <Text
      fontSize='24px'
      lineHeight='24px'
      width='69px'
      textAlign='center'
    >
      {gotCuttedPlayer.nickname} GOT CUT!!
    </Text>
  )
}

export default function Table ({ tableContent }) {
  const lobby = useLobby()

  const players = lobby.getPlayers()

  const myPlayerID = window.localStorage.getItem('playerID')

  const currentPlayerIndex = players.findIndex(({ playerID }) => playerID === myPlayerID)

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
          {lobby.gotCut && <CutAnimation />}
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
