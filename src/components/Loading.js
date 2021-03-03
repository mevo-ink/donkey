import {
  Image
} from '@chakra-ui/react'

import loadinGif from 'images/loading.gif'

import { motion, AnimatePresence } from 'framer-motion'
const MotionImage = motion(Image)

export default function LoadingRoom ({ marginTop }) {
  return (
    <AnimatePresence>
      <MotionImage
        w='95vw'
        maxWidth='920px'
        objectFit='cover'
        mt={marginTop}
        src={loadinGif}
        alt='Spinning Logo'
        zIndex='0'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1 } }}
        exit={{ scale: 9, transition: { duration: 1 } }}
      />
    </AnimatePresence>
  )
}
