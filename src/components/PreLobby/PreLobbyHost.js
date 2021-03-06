import { Text, Flex, Button } from '@chakra-ui/react'

import database from 'utils/firebase'

import { motion } from 'framer-motion'
const MotionFlex = motion(Flex)

const containerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2
    }
  },
  end: {
    transition: {
      staggerChildren: 0.2
    }
  }
}

const circleVariants = {
  start: {
    y: '50%',
    opacity: 0.1
  },
  end: {
    y: '150%',
    opacity: 1
  }
}

const transition = {
  duration: 1,
  yoyo: Infinity,
  ease: 'easeInOut'
}

export default function PreLobbyGuest ({ lobby }) {
  const onStartGame = () => {
    database().ref(`${lobby.name}`).update({
      state: 'DEALING'
    })
  }
  return (
    <Flex
      width='100%'
      height='100%'
      bg='rgba(0, 0, 0, 0.5)'
      placeItems='center'
      overflow='hidden'
      borderRadius='200px'
      flexDirection='column'
      justifyContent='center'
      fontWeight='bold'
    >
      <Text
        fontSize='24px'
        lineHeight='24px'
        width='69px'
        textAlign='center'
      >
        Waiting <br /> For <br /> Players
      </Text>
      <MotionFlex initial={{ y: -50 }}>
        <MotionFlex
          width='50px'
          height='18px'
          fontSize='60px'
          justifyContent='space-around'
          variants={containerVariants}
          initial='start'
          animate='end'
        >
          <MotionFlex
            variants={circleVariants}
            transition={transition}
          >
            .
          </MotionFlex>
          <MotionFlex
            variants={circleVariants}
            transition={transition}
          >
            .
          </MotionFlex>
          <MotionFlex
            variants={circleVariants}
            transition={transition}
          >
            .
          </MotionFlex>
        </MotionFlex>
      </MotionFlex>
      <Button
        mt='50px'
        color='black'
        zIndex='1'
        width='80px'
        height='40px'
        background='linear-gradient(180deg, #45DB54 0%, #197027 100%)'
        boxShadow='0px 5px 6px rgba(0, 0, 0, 0.25)'
        borderRadius='25px'
        _active={{ bg: 'unherit' }}
        _hover={{ bg: 'unherit' }}
        onClick={onStartGame}
      >
        Start Game
      </Button>
    </Flex>
  )
}
