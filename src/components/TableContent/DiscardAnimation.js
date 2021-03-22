import { Fragment, useEffect } from 'react'

import { useLobby } from 'context/LobbyContext'

import { Image } from '@chakra-ui/react'

import cardBack from 'images/cardBack.png'

import NextPlayerIndicator from 'components/Player/NextPlayerIndicator'

import { motion, useAnimation } from 'framer-motion'

const MotionImage = motion(Image)

export default function DiscardPileAnimation () {
  const lobby = useLobby()

  const flipControls = useAnimation()
  const discardControls = useAnimation()
  const nextPlayerControls = useAnimation()

  const tableCenterPos = {
    top: '190px',
    bottom: '190px',
    left: '87.5px',
    right: '87.5px'
  }

  useEffect(() => {
    (async () => {
      // perform flip animation
      await Promise.all([
        flipControls.start({
          rotateY: -180,
          transition: { delay: 1, duration: 0.8 }
        }),
        discardControls.start({
          rotateY: 0,
          transition: { delay: 1, duration: 0.8 }
        })
      ])
      // perform discard animation
      await discardControls.start({
        ...tableCenterPos,
        scale: [1, 0.5],
        transition: { duration: 1 }
      })
      // show next turn animation
      const nextPlayerID = lobby.getHighestPlayerIDFromTableCards()
      const { avatarPos } = lobby.getPlayerPositions(nextPlayerID)
      await nextPlayerControls.start({
        ...avatarPos,
        opacity: 1,
        transition: { duration: 1 }
      })
      // update state
      await lobby.onDiscardAnimationEnd()
    })()
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <NextPlayerIndicator controls={nextPlayerControls} />
      {lobby.getTableCards().map(tableCard => {
        const { cardPos } = lobby.getPlayerPositions(tableCard.playerID)
        return (
          <Fragment key={tableCard.cardID}>
            <MotionImage
              src={cardBack}
              width='40px'
              objectFit='contain'
              position='absolute'
              sx={{
                webkitBackfaceVisibility: 'hidden',
                backfaceVisibility: 'hidden'
              }}
              initial={{ ...cardPos, rotateY: -180 }}
              animate={discardControls}
            />
            <MotionImage
              src={tableCard.url}
              width='40px'
              objectFit='contain'
              position='absolute'
              sx={{
                webkitBackfaceVisibility: 'hidden',
                backfaceVisibility: 'hidden'
              }}
              initial={{ ...cardPos }}
              animate={flipControls}
            />
          </Fragment>
        )
      })}
    </>
  )
}
