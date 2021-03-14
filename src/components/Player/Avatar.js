import { Image } from '@chakra-ui/react'

import botImage from 'images/bot.png'

export default function Avatar ({ player, position }) {
  return (
    <>
      {player.lastOnline && (
        <Image
          width='35px'
          maxW='unset'
          objectFit='contain'
          src={botImage}
          position='absolute'
          {...position}
        />
      )}
      {!player.lastOnline && (
        <Image
          src={player.avatar}
          w='31px'
          h='31px'
          borderRadius='50%'
          opacity={player.lastOnline ? '0' : '1'}
          position='absolute'
          {...position}
        />
      )}
    </>
  )
}
