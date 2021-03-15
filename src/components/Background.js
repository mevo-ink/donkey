import { useLobby } from 'context/LobbyContext'

import {
  Grid,
  Text,
  Image
} from '@chakra-ui/react'

import bgImage from 'images/bg.png'

export default function Background ({ children, noText }) {
  const lobby = useLobby()

  const offset = ['LOBBY', 'DEALING', 'PRE_LOBBY', 'ENDGAME'].includes(lobby.state)

  return (
    <Grid
      w='100%'
      h='100vh'
      placeItems='center'
      position='relative'
      fontFamily='Amatic SC, cursive'
      color='white'
    >
      <Grid
        position='absolute'
        placeItems='center'
        opacity='0.20'
        zIndex='0'
      >
        <Image
          src={bgImage}
          w='95vw'
          maxWidth='920px'
          objectFit='cover'
          mt={offset && '-50px'}
        />
        {!offset && !noText && lobby.state !== 'ENDGAME' && (
          <>
            <Text
              fontSize='48px'
              lineHeight='48px'
              mt='23px'
            >
              Kazhudai
            </Text>
            <Text
              fontSize='14px'
              lineHeight='14px'
              mt='10px'
            >
              A Card Game for Donkeys
            </Text>
          </>
        )}
      </Grid>
      {children}
    </Grid>
  )
}
