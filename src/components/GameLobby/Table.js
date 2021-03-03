import {
  Grid
} from '@chakra-ui/react'

import { motion } from 'framer-motion'

import User from 'components/GameLobby/User'

const MotionGrid = motion(Grid)

const rotate = (array, times) => {
  while (times--) {
    const temp = array.shift()
    array.push(temp)
  }
}

const getPositions = (count) => {
  // 12
  return [
    { left: '105px', bottom: '-17px' },
    { left: '22px', top: '415px' },
    { left: '-9px', top: '318px' },
    { left: '-9px', top: '220px' },
    { left: '-9px', top: '126px' },
    { left: '22px', top: '33px' },
    { right: '105px', top: '-7px' },
    { right: '22px', top: '33px' },
    { right: '-9px', top: '126px' },
    { right: '-9px', top: '220px' },
    { right: '-9px', top: '318px' },
    { right: '22px', top: '415px' }
  ]
  // 4
  // return [
  //   { left: '105px', bottom: '-17px' },
  //   // { left: '22px', top: '415px' },
  //   // { left: '-9px', top: '318px' },
  //   { left: '-9px', top: '220px' },
  //   // { left: '-9px', top: '126px' },
  //   // { left: '22px', top: '33px' },
  //   { right: '105px', top: '-7px' },
  //   // { right: '22px', top: '33px' },
  //   // { right: '-9px', top: '126px' },
  //   { right: '-9px', top: '220px' },
  //   // { right: '-9px', top: '318px' },
  //   // { right: '22px', top: '415px' }
  // ]
}

export default function Table ({ room }) {
  const visitorID = window.localStorage.getItem('visitorID')

  const users = Object.values(room.users)

  const currentPlayerIndex = users.findIndex(user => user.visitorID === visitorID)

  if (currentPlayerIndex >= 0) rotate(users, currentPlayerIndex)

  const positions = getPositions(users.length)

  return (
    <MotionGrid
      width='242px'
      height='470px'
      placeItems='center'
      background='linear-gradient(180deg, #363C67 0%, #2A2E54 100%)'
      boxShadow='0px 5px 6px 5px rgba(0, 0, 0, 0.25)'
      borderRadius='200px'
      position='relative'
      initial={{ scale: 0 }}
      animate={{ scale: 1, transition: { delay: 0.3, duration: 0.2 } }}
    >
      <Grid
        width='215px'
        height='440px'
        placeItems='center'
        background='linear-gradient(180deg, #464D86 0%, #2A2E54 100%)'
        boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
        borderRadius='200px'
        gridTemplateColumns='1fr 1fr'
      >
        {users.map((user, idx) => <User key={user.visitorID} user={user} position={positions[idx]} />)}
      </Grid>
    </MotionGrid>
  )
}
