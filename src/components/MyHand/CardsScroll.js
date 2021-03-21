import { useRef } from 'react'

import { Button, Flex } from '@chakra-ui/react'

import { BsFillCaretRightFill, BsFillCaretLeftFill } from 'react-icons/bs'

export default function CardsScroll ({ children, myCardsRef }) {
  const buttonLeft = useRef()
  const buttonRight = useRef()

  function sideScroll (element, direction, speed, distance, step) {
    let scrollAmount = 0
    const slideTimer = setInterval(function () {
      if (direction === 'left') {
        element.scrollLeft -= step
        buttonLeft.current.style.display = 'none'
        buttonRight.current.style.display = 'flex'
      } else {
        element.scrollLeft += step
        buttonRight.current.style.display = 'none'
        buttonLeft.current.style.display = 'flex'
      }
      scrollAmount += step
      if (scrollAmount >= distance) {
        window.clearInterval(slideTimer)
      }
    }, speed)
  }

  return (
    <Flex
      width='100vw'
      h={{ base: '75px', ipad: '120px' }}
      alignItems='center'
      justifyContent='center'
      position='absolute'
      bottom='0px'
      color='white'
      outline='none'
      border='none'
      fontSize='20px'
    >
      <Button
        ref={buttonLeft}
        display='none'
        as={Flex}
        zIndex='1'
        borderRadius='50%'
        p='0px'
        mt={{ ipad: '35px' }}
        backgroundColor='rgba(0, 0, 0, 0.8)'
        position='absolute'
        left='1'
        cursor='pointer'
        _active={{ bg: '' }}
        _hover={{ bg: '' }}
        onClick={() => sideScroll(myCardsRef.current, 'left', 1, 100, 1)}
      >
        <BsFillCaretLeftFill />
      </Button>
      {children}
      <Button
        ref={buttonRight}
        as={Flex}
        h='40px'
        zIndex='1'
        borderRadius='50%'
        p='0px'
        mt={{ ipad: '35px' }}
        backgroundColor='rgba(0, 0, 0, 0.8)'
        position='absolute'
        right='1'
        cursor='pointer'
        _active={{ bg: '' }}
        _hover={{ bg: '' }}
        onClick={() => sideScroll(myCardsRef.current, 'right', 1, 100, 1)}
      >
        <BsFillCaretRightFill />
      </Button>
    </Flex>
  )
}
