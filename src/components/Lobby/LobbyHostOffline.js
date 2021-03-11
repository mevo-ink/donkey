import { useEffect, useContext } from 'react'

import usePlayerDisconnect from 'hooks/usePlayerDisconnect'

import database from 'utils/firebase'

import { LobbyContext } from 'utils/LobbyContext'

import { Text, Flex } from '@chakra-ui/react'

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
  repeat: 'Infinity',
  repeatType: 'reverse',
  ease: 'easeInOut'
}

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
      position='absolute'
    >
      <Text
        fontSize='24px'
        lineHeight='34px'
        width='auto'
        textAlign='center'
      >
        Host <br /> Disconnected! <br /> Choosing <br /> a <br /> New <br /> Host
      </Text>
      <MotionFlex initial={{ y: -50 }}>
        <MotionFlex
          width='50px'
          height='25px'
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
    </Flex>
  )
}
