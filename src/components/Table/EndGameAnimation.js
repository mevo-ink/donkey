import { useLobby } from 'context/LobbyContext'

import database from 'utils/firebase'

import { Image, Text, Box, Flex, Button } from '@chakra-ui/react'

import donkeyTemplate from 'images/endgameDonkey.png'

import { motion } from 'framer-motion'
const MotionBox = motion(Box)

export default function EndGameAnimation () {
  const lobby = useLobby()

  const donkeyPlayer = lobby.players[lobby.table.donkey]

  const handleRestartGame = () => {
    database().ref(`${lobby.settings.name}/table`).update({
      donkey: null,
      cards: null,
      state: 'PREGAME'
    })
  }

  return (
    <MotionBox
      initial={{ scale: 0, rotate: 360 }}
      animate={{ scale: 1, rotate: 0, transition: { duration: 0.5 } }}
    >
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
      {lobby.amIHost() && (
        <Flex w='100%' justifyContent='space-between'>
          {[{
            name: 'Restart',
            color: 'linear-gradient(180deg, #6BE8FF 0%, #349CB6 100%)',
            onClick: handleRestartGame
          }, {
            name: 'Go Home',
            color: 'linear-gradient(180deg, #FE9696 0%, #E76C6C 100%)',
            onClick: () => { window.location.href = '/' }
          }
          ].map(({ name, color, onClick }) => (
            <Button
              key={name}
              w='50px'
              h='25px'
              fontSize='15px'
              lineHeight='15px'
              fontWeight='bold'
              bg={color}
              _active={{ bg: color }}
              _hover={{ bg: color }}
              boxShadow='0px 5px 6px rgba(0, 0, 0, 0.25)'
              borderRadius='25px'
              cursor='pointer'
              m='20px 10px'
              zIndex='5'
              onClick={onClick}
            >
              {name}
            </Button>
          ))}
        </Flex>
      )}
    </MotionBox>
  )
}
