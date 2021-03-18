import { Flex } from '@chakra-ui/react'

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

export default function LoadingInline () {
  return (
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
        {[...'123'].map(idx => (
          <MotionFlex
            key={idx}
            variants={circleVariants}
            transition={transition}
          >
            .
          </MotionFlex>
        ))}
      </MotionFlex>
    </MotionFlex>
  )
}
