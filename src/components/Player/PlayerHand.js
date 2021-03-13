import { useState } from 'react'

import { useLobby } from 'context/LobbyContext'

import {
  Box,
  Flex,
  Image
} from '@chakra-ui/react'

export default function PlayerHand () {
  const lobby = useLobby()

  const [rotateCardDegree, setRotateCardDegree] = useState(120)

  const myCards = lobby.getMyCards()

  return (
    <Flex
      w='100%'
      h='180px'
      wrap='wrap'
      position='absolute'
      bottom={0}
      overflow='hidden'
    >
      <Box
        width='100%'
        height='100%'
        position='absolute'
      >
        {myCards.map((card, idx) => (
          <Image
            src={card.url}
            key={card.suite + card.number}
            alt={`${card.number} of ${card.suite}`}
            left='50%'
            top='50%'
            height='100px'
            maxHeight='200px'
            objectFit='contain'
            position='absolute'
            filter='drop-shadow(0px 5px 6px rgba(0, 0, 0, 0.25))'
            transform={`translate(-50%, -50%) rotate(${-rotateCardDegree / 2 + rotateCardDegree / (myCards.length + 1) * (idx + 1)}deg)`}
            transformOrigin='center 200%'
            transition='transform 0.3s ease-out'
            onClick={() => lobby.playCard(card)}
            onMouseEnter={() => setRotateCardDegree(140)}
            onMouseLeave={() => setRotateCardDegree(120)}
          />
        ))}
      </Box>
    </Flex>
  )
}
