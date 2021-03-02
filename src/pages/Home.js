import { useEffect } from 'react'

import {
  Flex,
  Button
} from '@chakra-ui/react'

export default function Home () {
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
        name: 'New Game',
        color: 'linear-gradient(180deg, #FE9696 0%, #E76C6C 100%)',
        path: '/create-room'
      }, {
        name: 'Join Game',
        color: 'linear-gradient(180deg, #6BE8FF 0%, #349CB6 100%)',
        path: '/rooms'
      }
      ].map((button, idx) => (
        <Button
          key={idx}
          w='50vw'
          maxWidth='340px'
          h='51px'
          bg={button.color}
          boxShadow='0px 5px 6px rgba(0, 0, 0, 0.25)'
          borderRadius='25px'
          onClick={() => window.history.pushState(null, null, button.path)}
        >
          {button.name}
        </Button>
      ))}
    </Flex>
  )
}
