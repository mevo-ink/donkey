import { useEffect } from 'react'

import { useLobby } from 'context/LobbyContext'

import { Flex } from '@chakra-ui/react'

import Avatar from 'components/Table/Player/Avatar'
import Nickname from 'components/Table/Player/Nickname'
import HourGlass from 'components/Table/Player/HourGlass'
import Podium from 'components/Table/Player/Podium'

import { AnimatePresence, motion, useAnimation } from 'framer-motion'
const MotionFlex = motion(Flex)

export default function Player ({ player, avatarPos, isTop }) {
  const lobby = useLobby()

  const playerControls = useAnimation()

  const showPlayer = (lobby.table.gotCut && (player.playerID === lobby.table.gotCut.playerID || player.playerID === lobby.table.gotCut.card.playerID)) || !lobby.table.gotCut

  useEffect(() => {
    // start animation for players
    (async () => {
      await playerControls.start({
        scale: 1,
        opacity: 1,
        transition: { duration: 1 }
      })
    })() // eslint-disable-next-line
  }, [])

  useEffect(() => {
    // on cut start
    (async () => {
      if (lobby.table.gotCut && !showPlayer && !lobby.table.gotCut.hasEnded) {
        await playerControls.start({
          scale: 0,
          transition: { duration: 1 }
        })
      }
    })() // eslint-disable-next-line
  }, [lobby.table.gotCut])

  useEffect(() => {
    // snap animation has ended
    (async () => {
      if (lobby.table.hasSnapAnimationEnded) {
        if (player.playerID === lobby.table.gotCut.playerID) {
          await playerControls.start({
            opacity: 0,
            transition: { duration: 2.5 }
          })
          lobby.setShouldBringBackAllPlayers()
        }
      }
    })() // eslint-disable-next-line
  }, [lobby.table.hasSnapAnimationEnded])

  useEffect(() => {
    (async () => {
      if (lobby.table.shouldBringBackAllPlayers) {
        // bring back all players
        await playerControls.start({
          scale: 1,
          opacity: 1,
          transition: { delay: 0.8, duration: 0.3 }
        })
        // end cut animation
        lobby.endCutAnimation()
      }
    })() // eslint-disable-next-line
  }, [lobby.table.shouldBringBackAllPlayers])

  return (
    <AnimatePresence>
      <MotionFlex
        justifyContent='center'
        alignItems='center'
        position='absolute'
        zIndex='5'
        w='32px'
        h='32px'
        {...avatarPos}
        initial={{ scale: 0 }}
        animate={playerControls}
        exit={{ scale: 0, transition: { duration: 0.5 } }}
      >
        <Nickname playerID={player.playerID} isTop={avatarPos.top === '-23.5px'} />
        {lobby.table.state === 'GAME' && !lobby.table.tableCardsFull && (
          <HourGlass playerID={player.playerID} />
        )}
        <Avatar player={player} />
        {['first', 'second', 'third'].map(pos => (
          lobby.isPlayerAtPodiumPosition(player.playerID, pos) && <Podium key={pos} position={pos} isTop={avatarPos.top === '-23.5px'} />
        ))}
      </MotionFlex>
    </AnimatePresence>
  )
}
