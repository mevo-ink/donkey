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
  yoyo: Infinity,
  ease: 'easeInOut'
}

export default function PreLobbyGuest () {
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
        Waiting <br /> For <br /> Host <br /> To <br /> Start <br /> The <br /> Game
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
