import { useLobby } from 'context/LobbyContext'

import {
  Button,
  Popover,
  PopoverBody,
  PopoverArrow,
  PopoverTrigger,
  PopoverContent
} from '@chakra-ui/react'

export default function MaxPlayersPopover ({ children }) {
  const lobby = useLobby()

  const remainingSeats = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].filter(num => num > lobby.getPlayers().length)

  const handleClick = (idx, onClose) => {
    onClose()
    lobby.setMaxPlayers(idx)
  }

  return (
    <Popover>
      {({ isOpen, onClose }) => (
        <>
          <PopoverTrigger>
            <Button
              width='auto'
              height='20px'
              minWidth='0px'
              minHeight='0px'
              color='black'
              bg='linear-gradient(180deg, #E3E3E3 0%, #C2C2C2 100%)'
              boxShadow='0px 5px 6px rgba(0, 0, 0, 0.25)'
              borderRadius='5px'
              fontSize='18px'
              lineHeight='18px'
              fontWeight='bold'
              p='0px 5px'
              _active={{ bg: '' }}
              _hover={{ bg: '' }}
            >
              {`${lobby.getPlayers().length} / ${lobby.maxPlayers}`}
            </Button>
          </PopoverTrigger>
          <PopoverContent bg='transparent' borderRadius='25px'>
            <PopoverArrow bg='transparent' />
            <PopoverBody p='0'>
              {isOpen && remainingSeats.map(idx => (
                <Button
                  key={idx}
                  width='30px'
                  height='30px'
                  minWidth='0px'
                  minHeight='0px'
                  display='grid'
                  color='black'
                  bg='linear-gradient(180deg, #E3E3E3 0%, #C2C2C2 100%)'
                  boxShadow='0px 5px 6px rgba(0, 0, 0, 0.25)'
                  borderRadius='50%'
                  fontSize='18px'
                  lineHeight='18px'
                  fontWeight='bold'
                  m='8px'
                  p='0px'
                  _active={{ bg: '' }}
                  _hover={{ bg: '' }}
                  onClick={() => handleClick(idx, onClose)}
                >
                  {idx}
                </Button>
              ))}
            </PopoverBody>
          </PopoverContent>
        </>
      )}
    </Popover>
  )
}
