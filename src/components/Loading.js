import {
  Grid,
  Image
} from '@chakra-ui/react'

import loadingGif from 'images/loading.gif'

import { motion } from 'framer-motion'
const MotionImage = motion(Image)

export default function Loading ({ marginTop }) {
  return (
    <Grid
      w='100vw'
      h='100vh'
      placeItems='center'
    >
      <MotionImage
        w='95vw'
        maxWidth='920px'
        objectFit='cover'
        mt={marginTop}
        src={loadingGif}
        alt='Spinning Logo'
        zIndex='0'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1 } }}
      />
    </Grid>
  )
}
