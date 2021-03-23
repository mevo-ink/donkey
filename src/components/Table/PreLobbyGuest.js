import { Text, Flex } from '@chakra-ui/react'

import LoadingInline from 'components/LoadingInline'

export default function PreLobbyGuest () {
  return (
    <Flex
      width='100%'
      height='100%'
      bg='rgba(0, 0, 0, 0.5)'
      placeItems='center'
      overflow='hidden'
      borderRadius='200px'
      flexDirection='column'
      justifyContent='center'
      fontWeight='bold'
      position='absolute'
    >
      <Text
        fontSize='24px'
        lineHeight='24px'
        width='69px'
        textAlign='center'
      >
        Waiting <br /> For <br /> Host <br /> To <br /> Start <br /> The <br /> Game
      </Text>
      <LoadingInline />
    </Flex>
  )
}
