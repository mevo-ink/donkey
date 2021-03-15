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

  const isFanLayout = myCards.length < 10

  return (
    <Flex
      w='100%'
      h={isFanLayout ? '200px' : '100px'}
      wrap='wrap'
      position='absolute'
      bottom={0}
      // overflow='scroll'
      // overflowY='hidden'
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
        height='100%'
        position='absolute'
        justifyContent={isFanLayout && 'center'}
      >
        {myCards.map((card, idx) => {
          let fanLayout = {}
          let stackLayout = {}
          if (isFanLayout) {
            fanLayout = {
              position: 'absolute',
              transform: `translate(-50%, -20%) rotate(${-rotateCardDegree[idx] / 2 + rotateCardDegree[idx] / (myCards.length + 1) * (idx + 1)}deg)`,
              transformOrigin: 'center 200%',
              _hover: {
                transform: `translate(-50%, -70%) rotate(${-rotateCardDegree[idx] / 2 + rotateCardDegree[idx] / (myCards.length + 1) * (idx + 1)}deg)`
              },
              // onMouseEnter: () => setRotateCardDegree({ ...initialRotations, [idx - 1]: 140, [idx]: 180, [idx + 1]: 140 }),
              // onMouseLeave: () => setRotateCardDegree({ ...initialRotations })
            }
          } else {
            stackLayout = {
              transform: `translateX(${-idx * 40}%)`,
              _hover: {
                transform: `translate(${-idx * 40}%, -50px)`
              },
              // transform: `translateX(${-idx * 40}px)`,
              // onMouseEnter: {
              //   transform: 'translateY(50px)'
              // },
              // onMouseEnter: {
              //   transform: 'translateY(0px)'
              // }
            }
          }
          return (
            <Box
              key={card.cardID}
              // width='100%'
              // left='50%'
              // top='50%'
              onClick={() => lobby.playCard(card)}
              maxHeight='200px'
            >
              <Image
                src={card.url}
                alt={`${card.number} of ${card.suite}`}
                objectFit='contain'
                height='200px'
                width='150px'
                {...fanLayout}
                {...stackLayout}
                filter='drop-shadow(0px 5px 6px rgba(0, 0, 0, 0.25))'
                transition='transform 0.3s ease-out'

                // _hover={{
                //   transform: 'translateY(-50px)'
                // }}
                // onMouseEnter={(e) => isFanLayout ? setRotateCardDegree(140) : (e.target.style.transform = 'translateY(0px)')}
                // onMouseLeave={(e) => isFanLayout ? setRotateCardDegree(120) : (e.target.style.transform = 'translateY(0px)')}
              />
            </Box>
          )
        })}
      </Flex>
    </Flex>
  )
}
