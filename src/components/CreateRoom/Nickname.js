import { useEffect, useRef } from 'react'

import {
  Text,
  Input
} from '@chakra-ui/react'

export default function Nickname ({ nickname, onSubmit }) {
  const inputRef = useRef()

  useEffect(() => {
    // focus input field on mount
    inputRef.current.focus()
  }, [])

  const onChange = (e) => {
    // disallow white spaces
    // force to uppercase
    // limit characters to 15
    onSubmit(e.target.value.trim().toUpperCase().slice(0, 15))
  }

  return (
    <>
      <Text mt={8}>
        Enter Your Name, Donkey
      </Text>
      <Input
        ref={inputRef}
        w='200px'
        h='39px'
        mt='12px'
        textAlign='center'
        bg='linear-gradient(180deg, #E3E3E3 0%, #C2C2C2 100%)'
        boxShadow='0px 5px 6px rgba(0, 0, 0, 0.25)'
        borderRadius='25px'
        color='black'
        value={nickname}
        onChange={onChange}
      />
    </>
  )
}
