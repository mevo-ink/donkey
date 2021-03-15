import {
  Box,
  Text,
  Modal,
  Image,
  Button,
  VStack,
  ModalBody,
  ModalContent,
  ModalOverlay
} from '@chakra-ui/react'

import Background from 'components/Background'
import lobbyNotFound from 'images/lobbyNotFound.gif'

export default function LobbyNotFound ({ name }) {
  return (
    <Background noText>
      <Modal isOpen isCentered size='xs'>
        <ModalOverlay />
        <ModalContent
          pb={4}
          bg='rgba(255, 255, 255, 0.1)'
          boxShadow='none'
          w='95vw'
          h='95vw'
          maxWidth='920px'
          maxHeight='920px'
          objectFit='cover'
          borderRadius='50%'
          as='div'
          display='grid'
          placeItems='center'
          fontFamily='Amatic SC, cursive'
          color='white'
          fontWeight='bold'
          p='0'
        >
          <ModalBody>
            <VStack spacing={8}>
              <Box>
                <Text
                  fontSize='12px'
                  lineHeight='12px'
                  fontWeight='normal'
                >
                  Lobby Name
                </Text>
                <Text
                  fontSize='23px'
                  lineHeight='23px'
                >
                  {name}
                </Text>
              </Box>
              <Image
                w='30vw'
                maxWidth='350px'
                objectFit='cover'
                ignoreFallback
                src={lobbyNotFound}
                alt='Lobby Not Found'
              />
              <Text
                fontSize='18px'
                lineHeight='18px'
                textAlign='center'
              >
                Oops! Lobby Not Found<br />
                Please Check the Lobby Name
              </Text>
              <Button
                zIndex='1'
                width='80px'
                height='40px'
                background='linear-gradient(180deg, #45DB54 0%, #197027 100%)'
                boxShadow='0px 5px 6px rgba(0, 0, 0, 0.25)'
                borderRadius='25px'
                _active={{ bg: '' }}
                _hover={{ bg: '' }}
                onClick={() => { window.location.href = '/' }}
              >
                Go Home
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Background>
  )
}
