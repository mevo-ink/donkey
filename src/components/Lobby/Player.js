import {
  Grid,
  Text,
  Image
} from '@chakra-ui/react'

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
        {player.nickname} - {player.cards ? Object.values(player.cards).length : ''}
      </Text>
    </Grid>
  )
}
