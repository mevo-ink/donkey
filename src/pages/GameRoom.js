import { useEffect } from 'react'

import database from 'utils/firebase'

import {
  Box,
  Grid,
  Text,
  Flex
} from '@chakra-ui/react'

export default function GameRoom ({ name }) {
  useEffect(() => {
    // find the room and check if the current user is joined
    database().ref(name).on('value', (snapshot) => {
      const room = snapshot.val()
      console.log(room)
    }, console.log)
    // eslint-disable-next-line
  }, [])

  // const players = [
  //   {
  //     name: 'Vadiveelu',
  //     avatar: 'http://1.bp.blogspot.com/_Qlh9RCULHTM/S_y4GX_tjOI/AAAAAAAABGA/Mc-_yQwjkhg/s1600/Vadivelu.jpg'
  //   },
  //   {
  //     name: 'Vijay',
  //     avatar: 'https://i0.wp.com/hpcr8ion.com/wp-content/uploads/2019/07/Thalaphathi-Vijay-hpcr8ion.com-21.jpg?resize=680%2C680&ssl=1'
  //   },
  //   {
  //     name: 'Ajith',
  //     avatar: 'https://i5.behindwoods.com/tamil-movies-cinema-news-16/images/ajith-completes-dubbing-for-viswasam-photos-pictures-stills.jpg'
  //   },
  //   {
  //     name: 'Raj',
  //     avatar: 'https://www.nettv4u.com/imagine/29-07-2017/nassar.jpg'
  //   },
  //   {
  //     name: 'Dhanush',
  //     avatar: 'https://st1.photogallery.ind.sh/wp-content/uploads/indiacom/dhanush-back-with-hindi-film-201906-1559722015.jpg'
  //   },
  //   {
  //     name: 'Jana',
  //     avatar: 'https://scontent-mxp1-1.cdninstagram.com/v/t51.2885-19/s150x150/11875538_701037243373488_348071615_a.jpg?tp=1&_nc_ht=scontent-mxp1-1.cdninstagram.com&_nc_ohc=hCxo97k_9xsAX9z1QFh&oh=693ba70f0180f8e81d0de5a8430df716&oe=6067910B'
  //   },
  //   {
  //     name: 'Madhu',
  //     avatar: 'https://pbs.twimg.com/profile_images/1358438460168630274/Cis4da0E.jpg'
  //   },
  //   {
  //     name: 'SK',
  //     avatar: 'https://in.bmscdn.com/iedb/artist/images/website/poster/large/sivakarthikeyan-1042969-18-09-2017-03-37-23.jpg'
  //   },
  //   {
  //     name: 'Jiiva',
  //     avatar: 'https://www.pinkvilla.com/files/styles/contentpreview/public/jiiva.jpg?itok=ziW_RhV0'
  //   },
  //   {
  //     name: 'Nani',
  //     avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIh5QVsZvxTaH9J3XH8-jOzSYmul5tILzocw&usqp=CAU'
  //   },
  //   {
  //     name: 'Anaconda',
  //     avatar: 'https://lh3.googleusercontent.com/proxy/m3Rw2bFBD_FV7vJNLhOW_a3GOL6kB-niFPjhAYAKovunXYdEi1TqHx9i-X58AcBsAn9M8Q8rOiOd3fAkdhf_oTt_44hOvV3lgoXqlzETn8EGM71rIIn-ZFy-2Q'
  //   },
  //   {
  //     name: 'Me',
  //     avatar: 'https://res.cloudinary.com/arun99-dev/image/upload/v1610282144/gallery.arun99.net-v2/profile-picture_lsmwxa.jpg'
  //   }
  // ]

  return (
    <Grid
      zIndex='0'
      placeItems='center'
      width='100%'
      mt='-82px'
    >
      <Flex
        width='100%'
        justifyContent='space-between'
        fontSize='14px'
        lineHeight='14px'
        fontWeight='bold'
        mb='54px'
      >
        <Box ml='16px'>
          <Text fontSize='9px'>
            Room Name:
          </Text>
          <Text>
            FoamingMouth
          </Text>
        </Box>
        <Box
          mr='16px'
          textAlign='end'
        >
          <Text fontSize='9px'>
            Players:
          </Text>
          <Text>
            12/12
          </Text>
        </Box>
      </Flex>
      <Grid
        width='242px'
        height='470px'
        placeItems='center'
        background='linear-gradient(180deg, #363C67 0%, #2A2E54 100%)'
        boxShadow='0px 5px 6px 5px rgba(0, 0, 0, 0.25)'
        borderRadius='200px'
      >
        <Box
          width='215px'
          height='440px'
          background='linear-gradient(180deg, #464D86 0%, #2A2E54 100%)'
          boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
          borderRadius='200px'
        />
      </Grid>
    </Grid>
  )
}
