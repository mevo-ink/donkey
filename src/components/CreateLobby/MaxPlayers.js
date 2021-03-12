import { useState } from 'react'

import {
  Text,
  Flex,
  Button
} from '@chakra-ui/react'

import { motion } from 'framer-motion'

const MotionButton = motion(Button)

const getDialButtonPositions = () => {
  const outerDiameter = 208
  const outerRadius = outerDiameter / 2
  const dialWidth = 40
  const spacing = 14
  const innerRadius = outerRadius - dialWidth + spacing

  let alpha = Math.PI / 2
  const total = 11
  const corner = 2 * Math.PI / total

  const positions = []
  Array.from(Array(total).keys()).forEach(() => {
    positions.push({
      left: parseInt((outerRadius - dialWidth / 2) + (innerRadius * Math.cos(alpha))) + 'px',
      top: parseInt((outerRadius - dialWidth / 2) - (innerRadius * Math.sin(alpha))) + 'px'
    })
    alpha = alpha - corner
  })
  return positions
}

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
          {getDialButtonPositions().map(({ left, top }, idx) => (
            <MotionButton
              key={idx}
              width='40px'
              height='39px'
              position='absolute'
              left={left}
              top={top}
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
              onClick={() => onClick(idx + 2)}
            >
              {idx + 2}
            </MotionButton>
          ))}
        </Flex>
      )}
    </>
  )
}
