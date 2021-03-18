import { useEffect } from 'react'

import { useLobby } from 'context/LobbyContext'

import { Image } from '@chakra-ui/react'

import { getCards } from 'utils/cards'

import spinningCard from 'images/rotatingCardGif.gif'

import { motion, useAnimation } from 'framer-motion'
const MotionImage = motion(Image)

export default function DealingAnimation () {
  const controls = useAnimation()

  const lobby = useLobby()

  const cards = getCards()

  useEffect(() => {
    (async () => {
      if (lobby.table.state === 'DEALING') {
        let playerIndex = 0
        while (cards.length > 0) {
          const playerIDs = Object.values(lobby.table.seatings)
          const dealtPlayerID = playerIDs[playerIndex]
          const card = cards.pop()
          lobby.amIHost() && await lobby.dealPlayerCard(playerIndex, card)
          const { dealingPos: { x, y } } = dealtPlayerID ? lobby.getPlayerPositions(dealtPlayerID) : {}
          await controls.start({ opacity: [0, 1, 0], x, y, transition: { duration: 0.3 } })
          await controls.start({ opacity: 0, x: 0, y: 0 })
          playerIndex = (playerIndex + 1) % playerIDs.length
        }
        lobby.amIHost() && await lobby.startGame()
      }
    })() // eslint-disable-next-line
  }, [])

  return (
    <MotionImage
      src={spinningCard}
      width='20px'
      objectFit='contain'
      position='absolute'
      animate={controls}
      initial={{ opacity: 0, x: 0, y: 0 }}
    />
  )
}
