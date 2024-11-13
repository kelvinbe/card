import { Box } from '@chakra-ui/react'
import React from 'react'
import TextComponent from '../Text/Text';


interface ITotalsComponets{
    total: number;
    title: string;

}

const TotalsComponent = (props: ITotalsComponets) => {
    const {total, title} = props
  return (
    <Box className='flex flex-col'>
        <TextComponent weight='400' color='#A1A1A1'  size={'14px'} words={title} />
       <TextComponent weight='600' size={'40px'} words={total} />
    </Box>
  )
}

export default TotalsComponent