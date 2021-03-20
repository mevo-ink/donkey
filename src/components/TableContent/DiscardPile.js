import { motion } from 'framer-motion'

import { Image } from '@chakra-ui/react'

import cardBack from 'images/cardBack.png'

const MotionImage = motion(Image)

export default function DiscardPile () {
  return (
    <MotionImage
      src={cardBack}
      width='30px'
      objectFit='contain'
      zIndex='5'
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1, transition: { duration: 0.4 } }}
    />
  )
}
