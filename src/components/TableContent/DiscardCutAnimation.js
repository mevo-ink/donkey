import { Fragment } from 'react'

import { motion, useAnimation } from 'framer-motion'

import { useLobby } from 'context/LobbyContext'

import { Image } from '@chakra-ui/react'

import CutAnimation from 'components/TableContent/CutAnimation'

// import NextPlayerIndicator from 'components/Player/NextPlayerIndicator'

const MotionImage = motion(Image)

export default function DiscardCutAnimation () {
  const lobby = useLobby()

  const controls = useAnimation()
  // const nextPlayerControls = useAnimation()

  const onFinish = async () => {
    const { avatarPos } = lobby.getPlayerPositions(lobby.table.gotCut.playerID)
    console.log(avatarPos)
    await controls.start({
      ...avatarPos,
      scale: [1, 0.2],
      transition: { duration: 0.8 }
    })
    // show next turn animation
    // await nextPlayerControls.start({
    //   ...avatarPos,
    //   opacity: 1,
    //   transition: { duration: 1 }
    // })
    // update state
    await lobby.onCutAnimationEnd()
  }

  const TableCards = lobby.getTableCards().map(tableCard => {
    const { cardPos } = lobby.getPlayerPositions(tableCard.playerID)
    return (
      <MotionImage
        key={tableCard.cardID}
        src={tableCard.url}
        width='40px'
        objectFit='contain'
        position='absolute'
        sx={{
          webkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden'
        }}
        initial={{ ...cardPos }}
        animate={controls}
      />
    )
  })

  return (
    <>
      {/* <NextPlayerIndicator controls={nextPlayerControls} /> */}
      <CutAnimation onFinish={onFinish} />
      {TableCards}
    </>
  )
}
