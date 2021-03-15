import { Image } from '@chakra-ui/react'

import botImage from 'images/bot.png'

export default function Avatar ({ player, position }) {
  return (
    <>
      {player.lastOnline && (
        <Image
          width='32px'
          maxW='unset'
          objectFit='contain'
          src={botImage}
          borderRadius='50%'
          position='absolute'
          {...position}
          bg='white'
        />
      )}
      {!player.lastOnline && (
        <Image
          src={player.avatar}
          w='32px'
          h='31px'
          borderRadius='50%'
          opacity={player.lastOnline ? '0' : '1'}
          position='absolute'
          {...position}
          bg='white'
        />
      )}
    </>
  )
}
