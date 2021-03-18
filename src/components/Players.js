import { useLobby } from 'context/LobbyContext'

import { Flex } from '@chakra-ui/react'

import HourGlass from 'components/Player/HourGlass'
import Nickname from 'components/Player/Nickname'
import CurrentCard from 'components/Player/CurrentCard'
import Avatar from 'components/Player/Avatar'

import { motion } from 'framer-motion'
const MotionFlex = motion(Flex)

export default function Players () {
  const lobby = useLobby()

  return (
    lobby.getAllPlayers().map(player => {
      const { avatarPos, cardPos } = lobby.getPlayerPositions(player.playerID)
      return (
        <MotionFlex
          key={player.playerID}
          justifyContent='center'
          alignItems='center'
          position='absolute'
          w='100%'
          h='100%'
          initial={{ scale: 0 }}
          animate={{ scale: 1, transition: { delay: 0.8, duration: 0.5 } }}
        >
          {lobby.state !== 'PREGAME' && (
            <CurrentCard playerID={player.playerID} position={cardPos} />
          )}
          {lobby.state === 'GAME' && !lobby.gotCut && !lobby.pileFull && (
            <HourGlass playerID={player.playerID} position={avatarPos} />
          )}
          <Avatar player={player} position={avatarPos} />
          <Nickname playerID={player.playerID} position={avatarPos} />
        </MotionFlex>
      )
    })
  )
}
