import { Fragment, useEffect } from 'react'

import { useLobby } from 'context/LobbyContext'

import { Image } from '@chakra-ui/react'

import cardBack from 'images/cardBack.png'

import { motion, useAnimation } from 'framer-motion'

const MotionImage = motion(Image)

export default function DiscardPileAnimation () {
  const lobby = useLobby()

  const flipControls = useAnimation()
  const discardControls = useAnimation()

  useEffect(() => {
    (async () => {
      if (lobby.amIHost()) {
        // flip animation
        await Promise.all([
          flipControls.start({
            rotateY: -180,
            opacity: 0,
            transition: { duration: 2 }
          }),
          discardControls.start({
            rotateY: 0,
            opacity: 1,
            transition: { duration: 2 }
          })
        ])
        // discard animation
        await discardControls.start({
          top: '190px',
          bottom: '190px',
          left: '87.5px',
          right: '87.5px',
          scale: [1, 0.7],
          transition: { duration: 3 }
        })
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
    })()
    // eslint-disable-next-line
  }, [])

  return (
    lobby.getTableCards().map(tableCard => {
      const { cardPos } = lobby.getPlayerPositions(tableCard.playerID)

      return (
        <Fragment key={tableCard.cardID}>
          <MotionImage
            src={cardBack}
            width='40px'
            objectFit='contain'
            position='absolute'
            initial={{ ...cardPos, rotateY: -180, opacity: 0 }}
            animate={discardControls}
          />
          <MotionImage
            src={tableCard.url}
            width='40px'
            objectFit='contain'
            position='absolute'
            initial={{ ...cardPos, rotateY: 0 }}
            animate={flipControls}
          />
        </Fragment>
      )
    })
  )
}
