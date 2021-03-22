import { Image } from '@chakra-ui/react'

import botImage from 'images/bot.png'

import { motion } from 'framer-motion'

const MotionImage = motion(Image)

export default function Avatar ({ player, position, ...rest }) {
  return (
    <>
      {player.lastOnline && (
        <MotionImage
          width='32px'
          maxW='unset'
          objectFit='contain'
          src={botImage}
          borderRadius='50%'
          position='absolute'
          zIndex='1'
          {...position}
          {...rest}
        />
      )}
      {!player.lastOnline && (
        <MotionImage
          src={player.avatar}
          w='32px'
          h='31px'
          borderRadius='50%'
          opacity={player.lastOnline ? '0' : '1'}
          position='absolute'
          zIndex='1'
          {...position}
          {...rest}
        />
      )}
    </>
  )
}
