import { useLobby } from 'context/LobbyContext'

import { Image } from '@chakra-ui/react'

export default function Pile ({ player, position, idx }) {
  const lobby = useLobby()
  // console.log(lobby.table.pile[idx].url)

  return (
    <Image
      width='22px'
      objectFit='contain'
      src={lobby.table?.pile && (Object.values(lobby.table.pile)[idx])?.url}
      position='absolute'
      {...position}
    />
  )
}
