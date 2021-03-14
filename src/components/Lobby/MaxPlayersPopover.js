import { useLobby } from 'context/LobbyContext'

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Button
} from '@chakra-ui/react'

export default function MaxPlayersPopover ({ children }) {
  const lobby = useLobby()

  const handleClick = (idx) => {
    lobby.setMaxPlayers(idx + 1)
  }

  return (
    <Popover>
      <PopoverTrigger>
        {children}
      </PopoverTrigger>
      <PopoverContent
        bg='transperant'
        color='transperant'
        borderRadius='25px'
      >
        <PopoverArrow bg='transperant' />
        <PopoverBody p='0'>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(idx => (
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
              onClick={() => handleClick(idx)}
            >
              {idx + 1}
            </Button>
          ))}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
