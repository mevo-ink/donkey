import {
  Box,
  Flex,
  Text,
  Image
} from '@chakra-ui/react'

export default function FindRooms () {
  const data = [
    {
      avatar: 'https://e7.pngegg.com/pngimages/435/91/png-clipart-cartoon-glasses-cartoon-boy-with-glasses-cartoon-character-glass-thumbnail.png',
      host: 'Raj',
      roomName: 'QualityTime',
      players: '2/8'
    },
    {
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJxdYct_y5xUDEMjI26Gds6_gllI4fZkGWYA&usqp=CAU',
      host: 'Madhu',
      roomName: 'GooseAppleCar',
      players: '6/8'
    },
    {
      avatar: 'https://png.pngtree.com/png-clipart/20190629/original/pngtree-boy-character-design-wearing-glasses-png-image_4071637.jpg',
      host: 'Arun',
      roomName: 'FoamingMouth',
      players: '8/8'
    },
    {
      avatar: 'https://png.pngtree.com/element_our/20200703/ourlarge/pngtree-cartoon-boy-avatar-wearing-glasses-and-suit-image_2301034.jpg',
      host: 'Jana',
      roomName: 'LoveBirds',
      players: '7/8'
    },
    {
      avatar: 'data:image/jpeg;base64,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',
      host: 'Vadiveelu',
      roomName: 'InTheRed',
      players: '3/8'
    }
  ]
  return (
    <Box
      width='200px'
      zIndex='0'
      mt='-57px'
    >
      <Text
        fontSize='48px'
        lineHeight='48px'
        fontWeight='bold'
        mb='15px'
      >
        Rooms
      </Text>
      {data.map((room, idx) => (
        <Flex
          key={idx}
          width='100%'
          height='67px'
          mb='15px'
          alignItems='center'
          background='linear-gradient(180deg, #E3E3E3 0%, #C2C2C2 100%)'
          boxShadow='0px 5px 6px rgba(0, 0, 0, 0.25)'
          borderRadius='25px'
        >
          <Image
            src={room.avatar}
            width='53px'
            h='53px'
            ml='9px'
            boxShadow='0px 5px 6px rgba(0, 0, 0, 0.25)'
            borderRadius='25px'
          />
          <Box
            color='black'
            height='53px'
            fontSize='14px'
            lineHeight='14px'
            fontWeight='bold'
            ml='16px'
            maxWidth='124px'
          >
            <Flex
              alignItems='flex-end'
              mb='3px'
            >
              <Text
                fontSize='9px'
                lineHeight='9px'
                fontStyle='normal'
                textAlign='end'
                mr='2px'
              >
                Host:
              </Text>
              <Text>{room.host}</Text>
            </Flex>
            <Flex
              alignItems='flex-end'
              mb='3px'
            >
              <Text
                fontSize='9px'
                lineHeight='9px'
                fontStyle='normal'
                textAlign='end'
                mr='2px'
              >
                Room Name:
              </Text>
              <Text>{room.roomName}</Text>
            </Flex>
            <Flex
              alignItems='flex-end'
              mb='3px'
            >
              <Text
                fontSize='9px'
                lineHeight='9px'
                fontStyle='normal'
                textAlign='end'
                mr='2px'
              >
                Players:
              </Text>
              <Text>{room.players}</Text>
            </Flex>
          </Box>
        </Flex>
      ))}
    </Box>
  )
}
