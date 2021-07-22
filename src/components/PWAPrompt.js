import { useState, useEffect } from 'react'

import {
  Box,
  Flex,
  Text,
  Modal,
  Image,
  Button,
  ModalOverlay,
  ModalContent,
  useDisclosure
} from '@chakra-ui/react'

import logo from 'images/bg.png'

import { motion } from 'framer-motion'
const MotionImage = motion(Image)

export default function PWAPrompt () {
  const { onClose } = useDisclosure()

  const [promptInstall, setPromptInstall] = useState(null)

  useEffect(() => {
    const handler = e => {
      e.preventDefault()
      setPromptInstall(e)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('transitionend', handler)
  }, [])

  const onClick = async evt => {
    evt.preventDefault()
    if (!promptInstall) {
      return
    }
    promptInstall.prompt()
    // Wait for the user to respond to the prompt
    const { outcome } = await promptInstall.userChoice
    if (outcome === 'accepted') {
      setPromptInstall(null)
    }
  }

  return (
    <Modal
      isOpen={promptInstall}
      onClose={onClose}
      closeOnOverlayClick={false}
      motionPreset='slideInBottom'
      isCentered
    >
      <ModalOverlay />
      <ModalContent
        w='70vw'
        h='410px'
        maxWidth='400px'
        minWidth='300px'
      >
        <Flex
          w='100%'
          h='100%'
          flexDirection='column'
          overflow='hidden'
          position='relative'
          borderRadius='4px'
          background='linear-gradient(180deg, rgba(54, 60, 105, 1) 0%, #222646 100%)'
        >
          <MotionImage
            src={logo}
            h='100%'
            objectFit='contain'
            position='absolute'
            left='120px'
            bottom='100px'
            opacity='0.5'
            animate={{ rotate: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
          />
          <Box
            zIndex='1'
            mt='225px'
            mx='30px'
            fontFamily='Amatic SC, cursive'
            color='white'
          >
            <Text
              fontSize='50px'
              lineHeight='50px'
              opacity='0.80'
            >
              Donkey
            </Text>
            <Text
              fontSize='20px'
              lineHeight='20px'
              mt='5px'
              opacity='0.80'
            >
              A Card Game For Donkeys
            </Text>
            <Flex W='100%' justifyContent='space-between'>
              <Button
                onClick={onClick}
                mt={8}
                color='black'
                width='100px'
                height='40px'
                fontSize='20px'
                lineHeight='20px'
                borderRadius='25px'
                boxShadow='0px 5px 6px rgba(0, 0, 0, 0.25)'
                bg='linear-gradient(180deg, #45DB54 0%, #197027 100%)'
                _active={{ bg: '' }}
                _hover={{ bg: '' }}
              >
                Install
              </Button>
              <Button
                onClick={onClose}
                mt={8}
                color='black'
                width='100px'
                height='40px'
                fontSize='20px'
                lineHeight='20px'
                borderRadius='25px'
                boxShadow='0px 5px 6px rgba(0, 0, 0, 0.25)'
                bg='linear-gradient(180deg, #E35B5B 0%, #7E1717 100%)'
                _active={{ bg: '' }}
                _hover={{ bg: '' }}
              >
                Cancel
              </Button>
            </Flex>
          </Box>
        </Flex>
      </ModalContent>
    </Modal>
  )
}
