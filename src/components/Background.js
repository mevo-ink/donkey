import {
  Grid,
  Text,
  Image
} from '@chakra-ui/react'

import bgImage from 'images/favicon.png'

export default function Background ({ hideText = false, children }) {
  return (
    <Grid
      bg='linear-gradient(180deg, rgba(54, 60, 105, 0.85) 0%, #222646 100%)'
      w='100vw'
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
        />
        {!hideText && (
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
