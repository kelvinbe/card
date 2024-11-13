import React from 'react'
import { Box } from '@chakra-ui/react'
import Loader from '@/components/Molecules/Loader'

const LandingPage = () => {
  return (
    <Box w='100%' background={'linear-gradient(to right bottom, #0a4da1, #DFE5ED, #DFE5ED, #DFE5ED, #DFE5ED);'} display={'flex'} height={'100vh'} alignContent={'center'} justifyContent={'center'} alignItems={'center'}>
        <Loader />
    </Box>
  )
}

export default LandingPage