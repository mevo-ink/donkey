import { useEffect, useContext } from 'react'

import usePlayerDisconnect from 'hooks/usePlayerDisconnect'

import {
  Text,
  Modal,
  VStack,
  ModalBody,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  CircularProgress
} from '@chakra-ui/react'

import database from 'utils/firebase'
import { LobbyContext } from 'utils/LobbyContext'

export default function LobbyHostOffline () {
  const [lobby] = useContext(LobbyContext)

  usePlayerDisconnect(lobby)

  useEffect(() => {
    const timeout = setTimeout(() => {
      // choose a random online player - except the current lobby host
      const newHost = Object.values(lobby.players).find(player => {
        return player.playerID !== lobby.host && !player.lastOnline
      })
      if (newHost) {
        database().ref(`${lobby.name}`).update({
          host: newHost.playerID,
          lastOnline: null
        })
      }
    }, 5000)
    return () => {
      clearTimeout(timeout)
    } // eslint-disable-next-line
  }, [])

  return (
    <Modal isOpen isCentered size='xs'>
      <ModalOverlay />
      <ModalContent pb={4}>
        <ModalHeader fontSize='2xl' textAlign='center'>Lobby host disconnected</ModalHeader>
        <ModalBody>
          <VStack>
            <Text textAlign='center'>
              Choosing a new host from remaining players
            </Text>
            <CircularProgress isIndeterminate color='purple.300' thickness='16px' />
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
