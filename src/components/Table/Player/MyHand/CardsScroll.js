import { useRef, useState, useEffect } from 'react'

import useCurrentWidth from 'hooks/useCurrentWidth'

import {
  Flex,
  IconButton
} from '@chakra-ui/react'

import {
  BsFillCaretRightFill,
  BsFillCaretLeftFill
} from 'react-icons/bs'

const ScrollButton = ({ btnRef, onClick, icon: Icon, ...rest }) => {
  return (
    <IconButton
      ref={btnRef}
      onClick={onClick}
      icon={<Icon />}
      as={Flex}
      zIndex='1'
      borderRadius='50%'
      p='0px'
      h='40px'
      mt={{ ipad: '35px' }}
      backgroundColor='rgba(0, 0, 0, 0.8)'
      position='absolute'
      cursor='pointer'
      _active={{ bg: '' }}
      _hover={{ bg: '' }}
      {...rest}
    />
  )
}

export default function CardsScroll ({ children, myCardsRef }) {
  const leftScrollBtnRef = useRef()
  const rightScrollBtnRef = useRef()

  const [showScroll, setShowScroll] = useState(false)

  const width = useCurrentWidth()

  useEffect(() => {
    setShowScroll(myCardsRef.current.scrollWidth > width) // eslint-disable-next-line
  }, [myCardsRef.current, width])

  function sideScroll (element, direction, speed, distance, step) {
    let scrollAmount = 0
    const slideTimer = setInterval(function () {
      if (direction === 'left') {
        element.scrollLeft -= step
        leftScrollBtnRef.current.style.display = 'none'
        rightScrollBtnRef.current.style.display = 'flex'
      } else {
        element.scrollLeft += step
        rightScrollBtnRef.current.style.display = 'none'
        leftScrollBtnRef.current.style.display = 'flex'
      }
      scrollAmount += step
      if (scrollAmount >= distance) {
        window.clearInterval(slideTimer)
      }
    }, speed)
  }

  return (
    <Flex
      width='100%'
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
      {showScroll && (
        <ScrollButton
          btnRef={leftScrollBtnRef}
          onClick={() => sideScroll(myCardsRef.current, 'left', 1, 100, 1)}
          icon={BsFillCaretLeftFill}
          left={1}
          display='none'
        />
      )}
      {children}
      {showScroll && (
        <ScrollButton
          btnRef={rightScrollBtnRef}
          onClick={() => sideScroll(myCardsRef.current, 'right', 1, 100, 1)}
          icon={BsFillCaretRightFill}
          right={1}
        />
      )}
    </Flex>
  )
}
