import { useLobby } from 'context/LobbyContext'

import { Flex } from '@chakra-ui/react'

import Avatar from 'components/Table/Player/Avatar'
import Nickname from 'components/Table/Player/Nickname'
import HourGlass from 'components/Table/Player/HourGlass'
import Podium from 'components/Table/Player/Podium'

import { AnimatePresence, motion } from 'framer-motion'
const MotionFlex = motion(Flex)

export default function Player ({ player, avatarPos, isTop }) {
  const lobby = useLobby()

  const showPlayer = (lobby.table.gotCut && (player.playerID === lobby.table.gotCut.playerID || player.playerID === lobby.table.gotCut.card.playerID)) || !lobby.table.gotCut

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
        animate={{ scale: showPlayer ? 1 : 0, transition: { duration: 0.5 } }}
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
