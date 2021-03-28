import { useLobby } from 'context/LobbyContext'
import { version } from '../../package.json'

import {
  Grid,
  Text,
  Image
} from '@chakra-ui/react'

import bgImage from 'images/bg.png'

export default function Background ({ children, noText }) {
  const lobby = useLobby()

  const offset = ['GAME', 'DEALING', 'PREGAME', 'ENDGAME'].includes(lobby?.table.state)

  return (
    <Grid
      w='100%'
      h='100%'
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
        {!offset && !noText && lobby?.table.state !== 'ENDGAME' && (
          <>
            <Text
              fontSize='48px'
              lineHeight='48px'
              mt='23px'
            >
              Donkey
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
      <Text
        position='absolute'
        bottom='0px'
        right='5px'
        opacity='0.20'
        fontWeight='bold'
      >
        {version}
      </Text>
    </Grid>
  )
}
