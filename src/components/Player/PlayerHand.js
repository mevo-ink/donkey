import { useState } from 'react'

import { useLobby } from 'context/LobbyContext'

import {
  Flex,
  Image
} from '@chakra-ui/react'

export default function PlayerHand () {
  const lobby = useLobby()

  const [rotateCardDegree, setRotateCardDegree] = useState(120)

  const myCards = lobby.getMyCards()

  const isFanLayout = myCards.length > 10

  return (
    <Flex
      w='100%'
      h='200px'
      wrap='wrap'
      position='absolute'
      bottom={0}
      overflow='hidden'
    >
      <Flex
        width='100%'
        height='100%'
        position='absolute'
        flexWrap='wrap'
        justifyContent='center'
      >
        {myCards.map((card, idx) => {
          let fanLayout = {}
          if (isFanLayout) {
            fanLayout = {
              position: 'absolute',
              transform: `translate(-50%, -50%) rotate(${-rotateCardDegree / 2 + rotateCardDegree / (myCards.length + 1) * (idx + 1)}deg)`
            }
          }
          return (
            <Image
              src={card.url}
              key={card.suite + card.number}
              alt={`${card.number} of ${card.suite}`}
              left='50%'
              top='50%'
              height='100px'
              maxHeight='200px'
              objectFit='contain'
              {...fanLayout}
              filter='drop-shadow(0px 5px 6px rgba(0, 0, 0, 0.25))'
              transformOrigin='center 200%'
              transition='transform 0.3s ease-out'
              onClick={() => lobby.playCard(card)}
              onMouseEnter={() => setRotateCardDegree(140)}
              onMouseLeave={() => setRotateCardDegree(120)}
            />
          )
        })}
      </Flex>
    </Flex>
  )
}
