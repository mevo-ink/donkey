import { Fragment } from 'react'

import { useLobby } from 'context/LobbyContext'

import { Flex, useBreakpointValue } from '@chakra-ui/react'

import Player from 'components/Table/Player'
import TableCard from 'components/Table/TableCard'
import DiscardCutAnimation from 'components/Table/DiscardCutAnimation'
import PreLobbyHost from 'components/Table/PreLobbyHost'
import PreLobbyGuest from 'components/Table/PreLobbyGuest'
import DealingAnimation from 'components/Table/DealingAnimation'
import LobbyHostOffline from 'components/Table/LobbyHostOffline'
import EndGameAnimation from 'components/Table/EndGameAnimation'
import DiscardPile from 'components/Table/DiscardPile'
import DiscardAnimation from 'components/Table/DiscardAnimation'

import { motion } from 'framer-motion'

const MotionFlex = motion(Flex)

export default function Table () {
  const lobby = useLobby()

  const scale = useBreakpointValue({ base: 0.6, iphone5: 0.7, iphone6: 0.9, iphone8: 1, ipad: 1.5 })

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
      mt='-50px'
      initial={{ scale: 0 }}
      animate={{ scale, transition: { duration: 0.5 } }}
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
          {!lobby.isHostOnline() && <LobbyHostOffline />}
          {lobby.isHostOnline() && lobby.table.state === 'PREGAME' && lobby.amIHost() && <PreLobbyHost />}
          {lobby.isHostOnline() && lobby.table.state === 'PREGAME' && !lobby.amIHost() && <PreLobbyGuest />}
          {lobby.isHostOnline() && lobby.table.state === 'DEALING' && <DealingAnimation />}
          {lobby.isHostOnline() && lobby.table.state === 'GAME' && lobby.hasDiscard() && <DiscardPile />}
          {lobby.isHostOnline() && lobby.table.tableCardsFull && !lobby.gotCut && <DiscardAnimation />}
          {lobby.isHostOnline() && lobby.table.gotCut && <DiscardCutAnimation />}
          {lobby.isHostOnline() && lobby.table.donkey && <EndGameAnimation />}
        </Flex>
        {lobby.getAllPlayers().map(player => {
          const { avatarPos, cardPos } = lobby.getPlayerPositions(player.playerID)
          return (
            <Fragment key={player.playerID}>
              <TableCard key={player.playerID} playerID={player.playerID} cardPos={cardPos} />
              <Player player={player} avatarPos={avatarPos} />
            </Fragment>
          )
        })}
      </Flex>
    </MotionFlex>
  )
}

/*
  TODO LIST:
  - add listener to make site responsive and add zoom to chrome & scale firefox
  - BUG:
    - Poor image quality on chrome because using scale
  - SHOW 1 2 3 BADGES
  - Optimize images
*/
