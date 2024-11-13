import { Box } from '@chakra-ui/react'
import React from 'react'
import { MdPointOfSale, MdOutlineStorefront } from "react-icons/md";

interface IMapKeyHeader{
  terminalsCount: number;
  storesCount: number
}


const MapKeyHeader = (props: IMapKeyHeader) => {

  const {terminalsCount, storesCount} = props

  return (
    <Box className='w-full bg-[#F8F8F8] mb-5 h-[32px] flex'>
        <Box className='flex justify-center items-center'>
          <Box className='flex justify-center items-center'>
            <Box className='mr-2'>
          <MdPointOfSale size={20} />
          </Box>
            {terminalsCount}
          </Box>
          <Box className='flex justify-center items-center '>
            <Box className='mr-2 ml-2'>
          <MdOutlineStorefront size={20} />
          </Box>
          {storesCount}
          </Box>
        </Box>
    </Box>
  )
}

export default MapKeyHeader