import { useState, useEffect } from 'react'

import { CircularProgress } from '@chakra-ui/react'

export default function HourGlass ({ children, lobby }) {
  const [time, setTime] = useState(0)

  const increseTime = (i) => {
    setTimeout(() => {
      setTime(i)
    }, 1000 * i)
  }

  useEffect(() => {
    setTime(0)
    for (let i = 0; i <= 20; i++) {
      increseTime(i)
    }
  }, [lobby.table.turn, lobby.table.pile])
  return (
    <CircularProgress value={time / 20 * 100} color='green.400'>
      {children}
    </CircularProgress>
  )
}
