import {
  Box,
  Flex,
  Link,
  Text,
  Image
} from '@chakra-ui/react'

const RowInfo = ({ label, value }) => (
  <Flex alignItems='flex-end' mb='3px'>
    <Text
      fontSize='9px'
      lineHeight='9px'
      fontStyle='normal'
      textAlign='end'
      mr='2px'
    >
      {label}:
    </Text>
    <Text>
      {value}
    </Text>
  </Flex>
)

export default function LobbyInfo ({ lobby }) {
  return (
    <Flex
      as={Link}
      href={`/lobbies/${lobby.name}`}
      width='100%'
      py={1}
      alignItems='center'
      background='linear-gradient(180deg, #E3E3E3 0%, #C2C2C2 100%)'
      boxShadow='0px 5px 6px rgba(0, 0, 0, 0.25)'
      borderRadius='25px'
      _hover={{ textDecoration: 'none' }}
    >
      <Image
        src={lobby.players[lobby.host]?.avatar}
        width='53px'
        h='53px'
        ml='9px'
        boxShadow='0px 5px 6px rgba(0, 0, 0, 0.25)'
        borderRadius='25px'
      />
      <Box
        ml={4}
        color='black'
        fontSize='14px'
        lineHeight='14px'
        fontWeight='bold'
      >
        <RowInfo label='Host' value={lobby.players[lobby.host].nickname} />
        <RowInfo label='Name' value={lobby.name} />
        <RowInfo label='Players' value={`${Object.keys(lobby.players).length} / ${lobby.maxPlayers}`} />
      </Box>
    </Flex>
  )
}
