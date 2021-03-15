import { useLobby } from 'context/LobbyContext'

import { Flex } from '@chakra-ui/react'

import HourGlass from 'components/Player/HourGlass'
import Nickname from 'components/Player/Nickname'
import CurrentCard from 'components/Player/CurrentCard'
import Avatar from 'components/Player/Avatar'

import DiscardPileAnimation from 'components/TableContent/DiscardPileAnimation'

import { motion } from 'framer-motion'
const MotionFlex = motion(Flex)

export default function Player ({ player, positions: [avatarNicknamePosition, cardPosition] = [] }) {
  const lobby = useLobby()

  return (
    <MotionFlex
      justifyContent='center'
      alignItems='center'
      position='absolute'
      w='100%'
      h='100%'
      initial={{ scale: 0 }}
      animate={{ scale: 1, transition: { delay: 0.3, duration: 0.3 } }}
    >
      {lobby.state !== 'PRE_LOBBY' && (
        <CurrentCard playerID={player.playerID} position={cardPosition} />
      )}
      {lobby.state === 'LOBBY' && !lobby.gotCut && !lobby.pileFull && (
        <HourGlass playerID={player.playerID} position={avatarNicknamePosition} />
      )}
      <Avatar player={player} position={avatarNicknamePosition} />
      {lobby.state !== 'ENDGAME' && (
        <Nickname playerID={player.playerID} position={avatarNicknamePosition} />
      )}
      {lobby.pileFull && <DiscardPileAnimation />}

    </MotionFlex>
  )
}
