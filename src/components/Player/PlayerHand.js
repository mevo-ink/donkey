import { useState } from 'react'

import { useLobby } from 'context/LobbyContext'

import {
  Box,
  Flex,
  Image
} from '@chakra-ui/react'

export default function PlayerHand () {
  const lobby = useLobby()

  const myCards = lobby.getMyCards()

  const initialRotations = Array.from(new Array(myCards.length).keys()).reduce((acc, elem) => {
    acc[elem] = 120 // initial rotation
    return acc
  }, {})

  const [rotateCardDegree, setRotateCardDegree] = useState({ ...initialRotations })

  const isFanLayout = myCards.length < 10 && lobby.state !== 'DEALING'

  return (
    <Flex
      w='100%'
      h={isFanLayout ? { mobile: '0px', iphone5: '150px', ipad: '150px' } : { mobile: '100px', ipad: '110px' }}
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
    >
      <Flex
        width='100%'
        position='absolute'
        justifyContent='center'
      >
        {myCards.map((card, idx) => {
          let fanLayout = {}
          let stackLayout = {}
          if (isFanLayout) {
            fanLayout = {
              position: 'absolute',
              transform: `translate(-50%, -20%) rotate(${-rotateCardDegree[idx] / 2 + rotateCardDegree[idx] / (myCards.length + 1) * (idx + 1)}deg)`,
              transformOrigin: 'center 200%',
              transition: 'transform 0.3s ease-out',
              marginTop: '70px',
              _hover: {
                transform: `translate(-50%, -70%) rotate(${-rotateCardDegree[idx] / 2 + rotateCardDegree[idx] / (myCards.length + 1) * (idx + 1)}deg)`
              },
              onMouseEnter: () => setRotateCardDegree({ ...initialRotations, [idx - 1]: 140, [idx]: 180, [idx + 1]: 140 }),
              onMouseLeave: () => setRotateCardDegree({ ...initialRotations })
            }
          } else {
            stackLayout = {
              // transform: `translateX(${-idx * 20}px)`,
              marginRight: { mobile: '-32px', ipad: '-22px' },
              marginTop: '20px',
              width: '53px',
              objectFit: 'contain',
              _hover: {
                marginTop: '0px'
              }
            }
          }
          return (
            <Box
              key={card.cardID}
              transition='0.3s ease-out'
              {...stackLayout}
            >
              <Image
                key={card.cardID}
                src={card.url}
                alt={`${card.number} of ${card.suite}`}
                width={{ mobile: '40px', ipad: '80px' }}
                maxW='1000px'
                // height='100%'
                filter='drop-shadow(0px 5px 6px rgba(0, 0, 0, 0.25))'
                {...fanLayout}
                onClick={() => lobby.playCard(card)}
              />
            </Box>
          )
        })}
      </Flex>
    </Flex>
  )
}
