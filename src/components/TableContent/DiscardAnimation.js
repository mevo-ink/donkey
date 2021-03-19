import { useEffect } from 'react'

import { useLobby } from 'context/LobbyContext'

import { Image } from '@chakra-ui/react'

import cardBack from 'images/cardBack.png'

import { motion } from 'framer-motion'
const MotionImage = motion(Image)

export default function DiscardPileAnimation () {
  const lobby = useLobby()

  // const playerIDsWithCards = lobby.getPlayers().filter(({ hasCards }) => hasCards).map(({ playerID }) => playerID)

  // console.log(playerIDsWithCards)
  // const cardPositions = lobby.getSeatingPositions()
  //   .filter(([_, __, ___, player]) => playerIDsWithCards.includes(player.playerID))
  //   .map(([_, cardPositions, __, player]) => cardPositions)

  // console.log(cardPositions)

  useEffect(() => {
    setTimeout(async () => {
      if (lobby.amIHost()) {
        // change turn
        await lobby.changeTurn(lobby.getHighestPlayerIDFromTableCards())
        // discard
        await lobby.discard()
        // stop discard animation
        await lobby.removeDiscardAnimation()
        // check for winning condition
        if (lobby.isEndGame()) {
          await lobby.setEndGame()
        }
      }
    }, 2000) // eslint-disable-next-line
  }, [])

  return <h1>ANIMATING</h1>
  // return (
  //   cardPositions.map((pos, idx) => {
  //     return (
  //       <MotionImage
  //         key={idx}
  //         src={cardBack}
  //         width='40px'
  //         objectFit='contain'
  //         maxW='unset'
  //         position='absolute'
  //         zIndex='3'
  //         initial={{ scale: 1, ...pos }}
  //         animate={{ scale: 0, ...pos, top: '190px', bottom: '190px', left: '87.5px', right: '87.5px', transition: { delay: 0.8, duration: 1 } }}
  //       />
  //     )
  //   })
  // )
}
