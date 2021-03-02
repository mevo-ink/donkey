import { useState } from 'react'

import {
  Box,
  Grid,
  Flex,
  Text,
  Image,
  Input,
  Button,
  PinInput,
  PinInputField
} from '@chakra-ui/react'

import { motion } from 'framer-motion'

// import { generateSlug } from 'random-word-slugs'

// import database from 'utils/firebase'

export default function CreateRoom () {
  const [show, setShow] = useState(false)
  const [playerNumber, setPlayerNumber] = useState('0')
  const MotionButton = motion.custom(Button)

  // const onCreateRoom = () => {
  //   const name = generateSlug()

  //   const visitorID = window.localStorage.getItem('visitorID')

  //   database().ref(name).set({ name, owner: visitorID })
  // }

  return (
    <Grid
      position='absolute'
      placeItems='center'
      fontSize='18px'
      lineHeight='18px'
      fontWeight='bold'
    >
      <Image
        src='https://i.pinimg.com/originals/10/40/09/104009be202e45fd75e7466de2036f4f.jpg'
        w='87px'
        h='87px'
        borderRadius='25px'
        boxShadow='0px 5px 6px rgba(0, 0, 0, 0.25)'
      />
      <Text mt='32px'>
        Enter Your Name, Donkey:
      </Text>
      <Input
        w='200px'
        h='39px'
        mt='12px'
        textAlign='center'
        bg='linear-gradient(180deg, #E3E3E3 0%, #C2C2C2 100%)'
        boxShadow='0px 5px 6px rgba(0, 0, 0, 0.25)'
        borderRadius='25px'
        color='black'
      />
      <Text mt='16px'>
        Room Password:
      </Text>
      <Grid
        width='100px'
        height='39px'
        mt='12px'
        placeItems='center'
        bg='linear-gradient(180deg, #E3E3E3 0%, #C2C2C2 100%)'
        boxShadow='0px 5px 6px rgba(0, 0, 0, 0.25)'
        borderRadius='25px'
      >
        <Flex
          width='92px'
          color='black'
        >
          <PinInput
            size='l'
            variant='unstyled'
          >
            <PinInputField />
            <Box w='1px' h='38px' bg='#9C9C9C' />
            <PinInputField />
            <Box w='1px' h='38px' bg='#9C9C9C' />
            <PinInputField />
            <Box w='1px' h='38px' bg='#9C9C9C' />
            <PinInputField />
          </PinInput>
        </Flex>
      </Grid>
      <Text mt='16px'>
        Players:
      </Text>
      <Button
        width='40px'
        height='39px'
        mt={show ? '96px' : '12px'}
        color='black'
        bg='linear-gradient(180deg, #E3E3E3 0%, #C2C2C2 100%)'
        boxShadow='0px 5px 6px rgba(0, 0, 0, 0.25)'
        borderRadius='25px'
        zIndex='1'
        onClick={() => setShow(!show)}
      >
        {playerNumber}
      </Button>
      {show && (
        <Flex
          position='relative'
          w='208px'
          h='208px'
          mt='-126px'
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(player => (
            <Box
              key={player}
              width='100%'
              height='100%'
              position='absolute'
              textAlign='center'
              transform={`rotate(${player * 30}deg)`}
            >
              <MotionButton
                width='40px'
                height='39px'
                color='black'
                zIndex='40'
                defaultValue={player}
                bg='linear-gradient(180deg, #E3E3E3 0%, #C2C2C2 100%)'
                boxShadow='0px 5px 6px rgba(0, 0, 0, 0.25)'
                borderRadius='25px'
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1, transition: { duration: 0.1, delay: player * 0.05 } }}
                onClick={() => {
                  setPlayerNumber(player)
                  setShow(false)
                }}
              >
                {player}
              </MotionButton>
            </Box>))}
        </Flex>
      )}
    </Grid>
  )
}
