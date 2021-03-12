import { useState } from 'react'

import {
  Text,
  Flex,
  Button
} from '@chakra-ui/react'

import { motion } from 'framer-motion'

const MotionButton = motion(Button)

const dialButtons = [
  {
    y: '11px',
    x: '127px'
  },
  {
    y: '42px',
    x: '158px'
  },
  {
    y: '84px',
    x: '168px'
  },
  {
    y: '127px',
    x: '158px'
  },
  {
    y: '158px',
    x: '127px'
  },
  {
    x: '84px',
    y: '169px'
  },
  {
    y: '158px',
    x: '41px'
  },
  {
    y: '127px',
    x: '11px'
  },
  {
    y: '84px',
    x: '0px'
  },
  {
    y: '42px',
    x: '10px'
  },
  {
    y: '11px',
    x: '41px'
  },
  {
    y: '0px',
    x: '84px'
  }
]

export default function MaxPlayersCount ({ maxPlayers, onSubmit }) {
  const [showDial, setShowDial] = useState(false)

  const onClick = (maxPlayers) => {
    onSubmit(maxPlayers)
    setShowDial(false)
  }

  return (
    <>
      <Text mt={4} fontSize='lg'>
        Max Players
      </Text>
      <Button
        width='40px'
        height='39px'
        mt={showDial ? '96px' : '12px'}
        color='black'
        bg='linear-gradient(180deg, #E3E3E3 0%, #C2C2C2 100%)'
        boxShadow='0px 5px 6px rgba(0, 0, 0, 0.25)'
        borderRadius='25px'
        zIndex='1'
        fontSize='23px'
        lineHeight='23px'
        fontWeight='bold'
        _active={{ bg: '' }}
        _hover={{ bg: '' }}
        onClick={() => setShowDial(!showDial)}
      >
        {maxPlayers}
      </Button>
      {showDial && (
        <Flex
          position='relative'
          w='208px'
          h='208px'
          mt='-126px'
        >
          {dialButtons.map((button, idx) => (
            <MotionButton
              key={idx}
              width='40px'
              height='39px'
              position='absolute'
              mt={button.y}
              ml={button.x}
              color='black'
              bg='linear-gradient(180deg, #E3E3E3 0%, #C2C2C2 100%)'
              boxShadow='0px 5px 6px rgba(0, 0, 0, 0.25)'
              borderRadius='25px'
              fontSize='23px'
              lineHeight='23px'
              fontWeight='bold'
              _active={{ bg: '' }}
              _hover={{ bg: '' }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.1, delay: idx * 0.05 } }}
              onClick={() => onClick(idx + 1)}
            >
              {idx + 1}
            </MotionButton>
          ))}
        </Flex>
      )}
    </>
  )
}
