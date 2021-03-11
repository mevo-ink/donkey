import { useLobby } from 'context/LobbyContext'

import { Text, Flex, Button } from '@chakra-ui/react'

import LoadingInline from 'components/LoadingInline'

import database from 'utils/firebase'

export default function PreLobbyGuest () {
  const lobby = useLobby()

  const onStartGame = () => {
    database().ref(`${lobby.name}`).update({
      state: 'DEALING'
    })
  }

  return (
    <Flex
      width='100%'
      height='100%'
      bg='rgba(0, 0, 0, 0.5)'
      placeItems='center'
      overflow='hidden'
      borderRadius='200px'
      flexDirection='column'
      justifyContent='center'
      fontWeight='bold'
      position='absolute'
    >
      <Text
        fontSize='24px'
        lineHeight='24px'
        width='69px'
        textAlign='center'
      >
        Waiting <br /> For <br /> Players
      </Text>
      <LoadingInline />
      <Button
        mt='50px'
        color='black'
        zIndex='1'
        width='80px'
        height='40px'
        background='linear-gradient(180deg, #45DB54 0%, #197027 100%)'
        boxShadow='0px 5px 6px rgba(0, 0, 0, 0.25)'
        borderRadius='25px'
        _active={{ bg: '' }}
        _hover={{ bg: '' }}
        onClick={onStartGame}
      >
        Start Game
      </Button>
    </Flex>
  )
}
