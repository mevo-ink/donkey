import { useContext } from 'react'
import { LobbyContext } from 'utils/LobbyContext'

import {
  Text,
  Modal,
  Image,
  Button,
  VStack,
  ModalBody,
  ModalHeader,
  ModalContent,
  ModalOverlay
} from '@chakra-ui/react'

import lobbyIsFullSVG from 'images/lobbyIsFull.svg'

export default function LobbyIsFull () {
  const [lobby] = useContext(LobbyContext)
  return (
    <Modal isOpen isCentered size='xs'>
      <ModalOverlay />
      <ModalContent pb={4}>
        <ModalHeader fontSize='2xl' textAlign='center'>Lobby Is Full</ModalHeader>
        <ModalBody>
          <VStack spacing={8}>
            <Image maxW='200px' height='150px' ignoreFallback src={lobbyIsFullSVG} alt='Lobby Is Full' />
            <Text fontWeight='bold'>{lobby.name}</Text>
            <Button colorScheme='purple' onClick={() => { window.location.href = '/lobbys' }}>
              Go Back
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
