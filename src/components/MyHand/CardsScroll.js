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
      position='absolute'
      bottom='0px'
      cursor='pointer'
      color='white'
      outline='none'
      border='none'
      fontSize='20px'
    >
      <Button
        ref={buttonLeft}
        display='none'
        as={Flex}
        justifyContent='center'
        alignItems='center'
        transition='all 0.4s ease-in-out'
        h={{ base: '40px', ipad: '120px' }}
        mt='-10px'
        zIndex='1'
        borderRadius='50%'
        p='0px'
        backgroundColor='rgba(0, 0, 0, 0.8)'
        position='absolute'
        left='0'
        onClick={() => sideScroll(myCardsRef.current, 'left', 1, 100, 1)}
      >
        <BsFillCaretLeftFill />
      </Button>
      {children}
      <Button
        ref={buttonRight}
        as={Flex}
        justifyContent='center'
        alignItems='center'
        transition='all 0.4s ease-in-out'
        h={{ base: '40px', ipad: '40px' }}
        mt='-10px'
        zIndex='1'
        borderRadius='50%'
        p='0px'
        ml='10px'
        backgroundColor='rgba(0, 0, 0, 0.8)'
        position='absolute'
        right='0'
        textAlign='center'
        onClick={() => sideScroll(myCardsRef.current, 'right', 1, 100, 1)}
      >
        <BsFillCaretRightFill />
      </Button>
    </Flex>
  )
}
