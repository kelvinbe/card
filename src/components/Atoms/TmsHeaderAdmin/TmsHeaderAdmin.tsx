import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { FaRegUser } from "react-icons/fa6";
import TextComponent from '../Text/Text';


const TmsHeaderAdmin = () => {
  return (
    <Flex justifyContent={'center'} alignItems={'center'}>
        <FaRegUser />
        <Box ml='6px'>
        <TextComponent weight='500' words='Admin' color='black' size={'sm'} />
        </Box>
    </Flex>
  )
}

export default TmsHeaderAdmin