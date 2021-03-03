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

import roomIsFullSVG from 'images/roomIsFull.svg'

export default function RoomIsFull ({ name }) {
  return (
    <Modal isOpen isCentered size='xs'>
      <ModalOverlay />
      <ModalContent pb={4}>
        <ModalHeader fontSize='2xl' textAlign='center'>Room Is Full</ModalHeader>
        <ModalBody>
          <VStack spacing={8}>
            <Image maxW='200px' height='150px' ignoreFallback src={roomIsFullSVG} alt='Room Is Full' />
            <Text fontWeight='bold'>{name}</Text>
            <Button colorScheme='purple' onClick={() => { window.location.href = '/' }}>
              Go Home
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
