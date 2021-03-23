import { Box } from '@chakra-ui/react'

import { motion } from 'framer-motion'

const Indicator = motion(Box)

export default function NextPlayerIndicator ({ controls }) {
  return (
    <Indicator
      bg='transparent'
      border='4px solid lime'
      width='33px'
      height='33px'
      borderRadius='100%'
      position='absolute'
      zIndex='1'
      opacity='0'
      animate={controls}
    />
  )
}
