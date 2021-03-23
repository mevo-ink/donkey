import { useLobby } from 'context/LobbyContext'

import { Flex } from '@chakra-ui/react'

import Avatar from 'components/Player/Avatar'
import Nickname from 'components/Player/Nickname'
import HourGlass from 'components/Player/HourGlass'
import TableCard from 'components/Player/TableCard'

import { AnimatePresence, motion } from 'framer-motion'
const MotionFlex = motion(Flex)

export default function Players () {
  const lobby = useLobby()

  return (
    lobby.getAllPlayers().map(player => {
      const { avatarPos, cardPos } = lobby.getPlayerPositions(player.playerID)
      return (
        <AnimatePresence key={player.playerID}>
          {!lobby.table.gotCut && (
            <>
              <MotionFlex
                justifyContent='center'
                alignItems='center'
                position='absolute'
                zIndex='5'
                w='32px'
                h='32px'
                {...avatarPos}
                initial={{ scale: 0 }}
                animate={{ scale: 1, transition: { delay: 0.8, duration: 0.5 } }}
                exit={{ scale: 0, transition: { duration: 0.5 } }}
              >
                {!lobby.table.gotCut && <Nickname playerID={player.playerID} isTop={avatarPos.top === '-23.5px'} />}
                {lobby.table.state === 'GAME' && !lobby.table.tableCardsFull && (
                  <HourGlass playerID={player.playerID} />
                )}
                <Avatar player={player} />
              </MotionFlex>
              {lobby.table.state === 'GAME' && !lobby.table.tableCardsFull && (
                <TableCard playerID={player.playerID} cardPos={cardPos} />
              )}
            </>
          )}
        </AnimatePresence>
      )
    })
  )
}
