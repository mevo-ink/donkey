import { useLobby } from 'context/LobbyContext'

import database from 'utils/firebase'

import { Image, Text, Box, Flex, Button } from '@chakra-ui/react'

import donkeyTemplate from 'images/endgameDonkey.png'

export default function EndGameAnimation () {
  const lobby = useLobby()

  const donkeyPlayer = lobby.players[lobby.donkey]

  const handleRestartGame = () => {
    database().ref(`${lobby.name}`).update({
      donkey: null,
      state: 'PREGAME',
      pileFull: null,
      table: null
    })
  }

  return (
    <Box>
      <Box position='relative' h='25px'>
        <Flex
          width='130px'
          height='25px'
          color='black'
          bg='linear-gradient(180deg, #E3E3E3 0%, #C2C2C2 100%)'
          boxShadow='0px 5px 6px rgba(0, 0, 0, 0.25)'
          borderRadius='25px'
          fontSize='18px'
          lineHeight='18px'
          fontWeight='bold'
          justifyContent='center'
          alignItems='center'
          position='absolute'
          zIndex='2'
        >
          hee-haw! hee-haw!
        </Flex>
        <Box
          width='10px'
          height='10px'
          color='black'
          bg='linear-gradient(180deg, #E3E3E3 0%, #C2C2C2 100%)'
          position='absolute'
          bottom='-5px'
          left='32px'
          zIndex='1'
          transform='rotate(45deg)'
        />
      </Box>
      <Box position='relative'>
        <Image
          src={donkeyPlayer.avatar}
          width='40px'
          top='28px'
          left='15px'
          objectFit='contain'
          position='absolute'
          background='#a3a9b7'
          borderRadius='50%'
        />
        <Image
          src={donkeyTemplate}
          width='130px'
          objectFit='contain'
        />
      </Box>
      <Text
        textAlign='center'
        fontSize='18px'
        lineHeight='18px'
        fontWeight='bold'
        mt='20px'
      >
        {donkeyPlayer.nickname} is The Donkey!
      </Text>
      {lobby.getMyself().playerID === lobby.host && (
        <Flex w='100%' justifyContent='space-between'>
          {[{
            name: 'Restart',
            color: 'linear-gradient(180deg, #6BE8FF 0%, #349CB6 100%)',
            path: 'restart'
          }, {
            name: 'Go Home',
            color: 'linear-gradient(180deg, #FE9696 0%, #E76C6C 100%)',
            path: '/'
          }
          ].map((button, idx) => (
            <Button
              key={idx}
              w='50px'
              h='25px'
              fontSize='15px'
              lineHeight='15px'
              fontWeight='bold'
              bg={button.color}
              _active={{ bg: button.color }}
              _hover={{ bg: button.color }}
              boxShadow='0px 5px 6px rgba(0, 0, 0, 0.25)'
              borderRadius='25px'
              cursor='pointer'
              m='20px 10px'
              zIndex='5'
              onClick={() => {
                if (button.path === '/') {
                  window.location.href = button.path
                } else { handleRestartGame() }
              }}
            >
              {button.name}
            </Button>
          ))}
        </Flex>
      )}
    </Box>
  )
}
