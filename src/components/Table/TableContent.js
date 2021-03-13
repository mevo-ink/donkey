import { Grid } from '@chakra-ui/react'

export default function TableContent ({ children }) {
  return (
    <Grid
      w='100%'
      height='100%'
      placeItems='center'
      gridColumn='1/-1'
    >
      {children}
    </Grid>
  )
}
