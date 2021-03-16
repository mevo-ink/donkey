import { useEffect } from 'react'

import { useTitle } from 'hookrouter'

import {
  Flex,
  Button
} from '@chakra-ui/react'

export default function Home () {
  useTitle('Kazhudai')

  useEffect(() => {
    // clean the url
    window.history.replaceState(null, null, '/')
  }, [])

  return (
    <Flex
      h='150px'
      flexDirection='column'
      justifyContent='space-between'
    >
      {[{
        name: 'Create Lobby',
        color: 'linear-gradient(180deg, #FE9696 0%, #E76C6C 100%)',
        path: '/createLobby'
      }, {
        name: 'Find Lobbies',
        color: 'linear-gradient(180deg, #6BE8FF 0%, #349CB6 100%)',
        path: '/lobbies'
      }
      ].map((button, idx) => (
        <Button
          key={idx}
          w='50vw'
          h='51px'
          maxWidth='340px'
          fontSize='20px'
          lineHeight='20px'
          fontWeight='bold'
          bg={button.color}
          _active={{ bg: button.color }}
          _hover={{ bg: button.color }}
          boxShadow='0px 5px 6px rgba(0, 0, 0, 0.25)'
          borderRadius='25px'
          onClick={() => { window.location.href = button.path }}
        >
          {button.name}
        </Button>
      ))}
    </Flex>
  )
}
