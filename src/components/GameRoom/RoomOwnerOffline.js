import { useEffect } from 'react'

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

export default function RoomOwnerOffline ({ room }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      // choose a random online user - except the current room owner
      const newOwner = Object.values(room.users).find(user => {
        return user.visitorID !== room.owner && !user.lastOnline
      })
      if (newOwner) {
        database().ref(`${room.name}`).update({
          owner: newOwner.visitorID,
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
        <ModalHeader fontSize='2xl' textAlign='center'>Room owner disconnected</ModalHeader>
        <ModalBody>
          <VStack>
            <Text textAlign='center'>
              Choosing a new owner from remaining players
            </Text>
            <CircularProgress isIndeterminate color='purple.300' thickness='16px' />
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
