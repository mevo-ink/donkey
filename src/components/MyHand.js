import { useRef } from 'react'

import { useLobby } from 'context/LobbyContext'

import {
  Box,
  Flex,
  Image
} from '@chakra-ui/react'

import CardsScroll from 'components/MyHand/CardsScroll'

export default function MyHand () {
  const lobby = useLobby()

  const myCards = lobby.getMyCards()

  const myCardsRef = useRef()

  return (
    <CardsScroll myCardsRef={myCardsRef}>
      <Flex
        w='100%'
        h={{ base: '100px', ipad: '110px' }}
        wrap='wrap'
        position='absolute'
        bottom={0}
        overflowX='scroll'
        overflowY='hidden'
        sx={{
          '::-webkit-scrollbar': {
            display: 'none'
          },
          /* Works on Firefox */
          '&': {
            scrollbarWidth: 'none'
          }
        }}
        ref={myCardsRef}
      >
        <Flex
          width='100%'
          position='absolute'
          justifyContent='center'
        >
          {myCards.map((card, idx) => {
            return (
              <Box
                key={card.cardID}
                transition='0.3s ease-out'
                marginRight={{ base: '-32px', ipad: '-22px' }}
                marginTop='20px'
                width='53px'
                objectFit='contain'
                _hover={{ marginTop: '0px' }}
              >
                <Image
                  key={card.cardID}
                  src={card.url}
                  alt={`${card.number} of ${card.suite}`}
                  width={{ base: '50px', ipad: '80px' }}
                  maxW='1000px'
                  filter='drop-shadow(0px 5px 6px rgba(0, 0, 0, 0.25))'
                  onClick={() => lobby.playCard(card)}
                />
              </Box>
            )
          })}
        </Flex>
      </Flex>
    </CardsScroll>
  )
}
