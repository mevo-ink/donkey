import { useRef, useState } from 'react'

import { useLobby } from 'context/LobbyContext'

import {
  Flex,
  Image
} from '@chakra-ui/react'

import CardsScroll from 'components/Table/Player/MyHand/CardsScroll'

import hideScrollBar from 'utils/hideScrollbar'

export default function MyHand () {
  const lobby = useLobby()

  const myCards = lobby.getMyCards()

  const myCardsRef = useRef()

  const [confirmCard, setConfirmCard] = useState()

  const lastTableCard = lobby.getTableCards()[0]

  const handleClick = (card) => {
    // don't have suite, can cut
    if (lastTableCard && lobby.getMyCards().filter(({ suite }) => suite === lastTableCard.suite).length === 0) {
      // play cut card
      if (confirmCard?.cardID === card.cardID) {
        lobby.playCard(card)
        setConfirmCard(null)
        // confirm cut card
      } else setConfirmCard(card)
    // have suite
    } else {
      // play card
      if (confirmCard?.cardID === card.cardID) {
        lobby.playCard(card)
        setConfirmCard(null)
        // confirm play card
      } else if (lastTableCard?.suite === card.suite) {
        setConfirmCard(card)
        // no cards in table, confirm card
      } else if (lastTableCard === undefined) setConfirmCard(card)
    }
  }

  return (
    <CardsScroll myCardsRef={myCardsRef}>
      <Flex
        w='100%'
        overflowX='scroll'
        overflow='scroll'
        sx={hideScrollBar}
        ref={myCardsRef}
      >
        {myCards.map(card => {
          return (
            <Image
              key={card.cardID}
              src={card.url}
              alt={`${card.number} of ${card.suite}`}
              marginRight={{ base: '-32px', ipad: '-22px' }}
              transition='0.3s ease-out'
              transform={card.cardID === confirmCard?.cardID && 'translateY(-80px)'}
              height={{ base: '90px', ipad: '120px' }}
              objectFit='contain'
              mt='80px'
              filter='drop-shadow(0px 5px 6px rgba(0, 0, 0, 0.25))'
              cursor='pointer'
              onClick={() => handleClick(card)}
            />
          )
        })}
      </Flex>
    </CardsScroll>
  )
}
