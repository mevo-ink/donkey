import { useContext } from 'react'

import {
  Grid,
  Text,
  Image
} from '@chakra-ui/react'

import HourGlass from 'components/Player/HourGlass'

import { LobbyContext } from 'utils/LobbyContext'

export default function User ({ player, position }) {
  const [lobby] = useContext(LobbyContext)

  return (
    <Grid
      placeItems='center'
      position='absolute'
      {...position}
    >
      {lobby.state === 'LOBBY' && <HourGlass playerID={player.playerID} />}
      <Image
        src={player.avatar}
        w='41px'
        h='41px'
        borderRadius='50%'
      />
      <Text
        fontSize='12px'
        lineHeight='12px'
        textAlign='center'
        width='31px'
        position='absolute'
        top='50px'
      >
        {player.nickname} - {lobby.table?.cards ? Object.values(lobby.table.cards).filter(card => card.playerID === player.playerID).length : ''}
      </Text>
    </Grid>
  )
}
