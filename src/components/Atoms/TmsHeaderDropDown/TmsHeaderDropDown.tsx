import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { FaChevronDown } from "react-icons/fa";
import { IoIosGlobe } from "react-icons/io";


const TmsHeaderDropDown = () => {
  return (
    <Flex  justifyContent={'center'} alignItems={'center'}>
        <IoIosGlobe size={24} />
        <FaChevronDown size={15} />
    </Flex>
  )
}

export default TmsHeaderDropDown