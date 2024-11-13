import TextComponent from '@/components/Atoms/Text/Text';
import { Box } from '@chakra-ui/react';
import React from 'react'
import { Link, useLocation } from 'react-router-dom';


interface ITablesNavigationBar{
    title: string;
    navLink1Name: string
    navLink2Name: string
    link1: string
    link2: string;
    mb: number

}



const TablesNavigationBar = (props: ITablesNavigationBar) => {


    const {title, navLink1Name, navLink2Name, link1, link2, mb} = props


  return (
    <Box mb={mb}>
        
     <TextComponent words={title} size={'lg'} weight='600' />
        <Box className='border-l-2'>
        <Box w={40} m={2}>
            <Link to={link1}>
     <TextComponent words={navLink1Name} size={'sm'} />   
     </Link>
        </Box>
        <Box m={2}>
            <Link to={link2}>
     <TextComponent words={navLink2Name} size={'sm'} />   
     </Link>    
        </Box>
        </Box>
        
    </Box>
  )
}

export default TablesNavigationBar