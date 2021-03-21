import { useLobby } from 'context/LobbyContext'

import {
  Button,
  useToast,
  useClipboard
} from '@chakra-ui/react'

export default function ShareLobby () {
  const lobby = useLobby()

  const toast = useToast()

  const { onCopy } = useClipboard(`${window.location}`)

  const onShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Donkey',
        text: lobby.settings.name,
        url: `${window.location.href}lobbies/${lobby.settings.name}`
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error))
    } else {
      onCopy()
      toast({
        title: 'Lobby Invite Has Been Copied!',
        status: 'success',
        duration: 3000
      })
    }
  }

  return (
    <Button
      width='auto'
      height='20px'
      minWidth='0px'
      minHeight='0px'
      color='black'
      bg='linear-gradient(180deg, #E3E3E3 0%, #C2C2C2 100%)'
      boxShadow='0px 5px 6px rgba(0, 0, 0, 0.25)'
      borderRadius='5px'
      fontSize='18px'
      lineHeight='18px'
      fontWeight='bold'
      p='0px 5px'
      _active={{ bg: '' }}
      _hover={{ bg: '' }}
      onClick={onShare}
    >
      {lobby.settings.name}
    </Button>
  )
}
