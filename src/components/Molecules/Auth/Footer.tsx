import React from 'react'
import { Box } from '@chakra-ui/react'
import BackImage from '../../../assets/BackgroundImg.png'
import TextComponent from '@/components/Atoms/Text/Text'

const Footer = () => {

  return (
    <Box display={'flex'} color={'white'} position={'absolute'} alignItems={'center'} marginLeft={'47%'} marginTop={'-30px'} justifyContent={'center'} >
        &copy; Copyright NATCCO 2024. All rights reserved
    </Box>
  )
}

export default Footer