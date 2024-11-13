import React from 'react'
import { Image, VStack, Box, Flex } from '@chakra-ui/react'
import KayaImage from '../../../assets/KAYA Icon Circle Bubble.png'
import PixelMobi from '../../../assets/mobi.png'
import TextComponent from '@/components/Atoms/Text/Text'

const SignInSection = () => {
  return (

        <Box display={'flex'} flexDirection={'column'} justifyContent={'space-between'}  h={'100%'}>
        <Image src={KayaImage} w={'100px'} h={'26%'} />
        <TextComponent words='Welcome Admin' color='white' size={'xl'} />
        <Image src={PixelMobi} w={'224px'} h={'60%'}  />
        </Box>

  )
}

export default SignInSection