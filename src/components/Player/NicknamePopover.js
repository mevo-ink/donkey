import { useRef } from 'react'

import { useLobby } from 'context/LobbyContext'

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Input,
  InputGroup,
  InputRightAddon,
  Button
} from '@chakra-ui/react'

import { MdDone } from 'react-icons/md'

export default function NicknamePopover ({ children }) {
  const lobby = useLobby()

  const nicknameValue = useRef()

  const handleClick = () => {
    lobby.setPlayerNickname(window.localStorage.getItem('playerID'), nicknameValue.current.value)
    nicknameValue.current.value = ''
  }

  return (
    <Popover>
      <PopoverTrigger>
        {children}
      </PopoverTrigger>
      <PopoverContent
        bg=''
        color=''
        borderRadius='25px'
        position='center'
      >
        <PopoverArrow bg='' />
        <PopoverBody p='0'>
          <InputGroup alignItems='center'>
            <Input
              ref={nicknameValue}
              width='80px'
              height='25px'
              minWidth='0px'
              minHeight='0px'
              display='grid'
              color='black'
              bg='linear-gradient(180deg, #E3E3E3 0%, #C2C2C2 100%)'
              boxShadow='0px 5px 6px rgba(0, 0, 0, 0.25)'
              borderRadius='25px'
              fontSize='20px'
              lineHeight='20px'
              fontWeight='bold'
              textAlign='center'
              m='3px'
              p='0px 10px'
              _active={{ bg: '' }}
              _hover={{ bg: '' }}
            />
            <InputRightAddon
              height='25px'
              p='0px'
              borderRadius='25px'
              bg='linear-gradient(180deg, #E3E3E3 0%, #C2C2C2 100%)'
              mr='3px'
            >
              <Button
                as={MdDone}
                p='0px'
                mr='3px'
                minWidth='0px'
                type='submit'
                width='22px'
                height='25px'
                backgroundColor='transparent'
                color='green'
                _hover={{ backgroundColour: 'transperent' }}
                onClick={handleClick}
              />
            </InputRightAddon>
          </InputGroup>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
