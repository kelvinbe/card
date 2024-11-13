import { Box } from '@chakra-ui/react'
import React from 'react'
import { Status } from 'types'
import '../../../index.css'


interface IStatusBlinker{
    status: Status;
    total: number;
    color: string;

}

const StatusBlinker = (props: IStatusBlinker) => {

    const {status, total} = props

  return (
    <Box className='flex w-[300px] align-items pl-40'>
    <Box className={`${status === 'Active' || status === 'Assigned' ? 'blink-class' : 'bg-[#BCDAEE]'}  w-[10px] h-[10px] bg-[#0A4DA1]  rounded-full mt-2 mr-2`}>
    </Box>
    <Box className='mr-2'>{total}</Box>
    <Box className='flex w-[68px] justify-end'>
    {status}
    </Box>
    </Box>
  )
}

export default StatusBlinker