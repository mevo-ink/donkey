import {
  Grid,
  Text,
  Image
} from '@chakra-ui/react'

// const IMAGE_BASE_URL = 'https://firebasestorage.googleapis.com/v0/b/donkeycardgame.appspot.com/o/cards%2Fclubs_1.png?alt=media'

export default function User ({ player, position }) {
  return (
    <Grid
      placeItems='center'
      position='absolute'
      {...position}
    >
      <Image
        src={player.avatar}
        w='31px'
        h='31px'
        borderRadius='50%'
      />
      <Text
        fontSize='12px'
        lineHeight='12px'
        textAlign='center'
        width='31px'
      >
        {player.nickname}
      </Text>
    </Grid>
  )
}
