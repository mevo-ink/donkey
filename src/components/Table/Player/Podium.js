import { Image } from '@chakra-ui/react'

import gold from 'images/gold.png'
import bronze from 'images/bronze.png'
import silver from 'images/silver.png'

import { motion } from 'framer-motion'
const MotionImage = motion(Image)

export default function Podium ({ position, isTop }) {
  if (position === 'first') {
    return (
      <MotionImage
        src={gold}
        zIndex='1'
        width='20px'
        objectFit='contain'
        position='absolute'
        top={isTop ? '-24px' : '33px'}
        left='25px'
        animate={{ scale: [0, 1], transition: { delay: 2, duration: 0.5 } }}
      />
    )
  }
  if (position === 'second') {
    return (
      <MotionImage
        src={bronze}
        zIndex='1'
        width='20px'
        objectFit='contain'
        position='absolute'
        top={isTop ? '-24px' : '33px'}
        left='25px'
        animate={{ scale: [0, 1], opacity: [0, 1], transition: { delay: 2, duration: 0.5 } }}
      />
    )
  }
  if (position === 'third') {
    return (
      <MotionImage
        src={silver}
        zIndex='1'
        width='20px'
        objectFit='contain'
        position='absolute'
        top={isTop ? '-24px' : '33px'}
        left='25px'
        animate={{ scale: [0, 1], transition: { delay: 2, duration: 0.5 } }}
      />
    )
  }
  if (!position) { return (<></>) }
}
