import { Flex, Box, Image } from '@chakra-ui/react'
import React from 'react'
import KayaLogo from '../../../assets/KAYA Icon-C 1.png'
import TextComponent from '@/components/Atoms/Text/Text'
import SearchBar from '@/components/Atoms/SearchBar/SearchBar'
import { IoMdNotificationsOutline } from "react-icons/io";
import TmsHeaderDropDown from '@/components/Atoms/TmsHeaderDropDown/TmsHeaderDropDown'
import TmsHeaderAdmin from '@/components/Atoms/TmsHeaderAdmin/TmsHeaderAdmin'



const TmsHeader = () => {
  return (
    <Flex  backgroundColor={'#F6F8FA'} justifyContent={'space-around'} alignItems={'center'} px={12}>
        <Flex p={3} className='flex justify-between w-full'>
          <Box className='flex items-center'>
        <Image width={'22px'}  src={KayaLogo} alt='KayaLogo' />
        <Box marginLeft={5}>
            <TextComponent weight='500'  words='Terminal Management System' color='black' size={'lg'} />
        </Box>
        </Box>

        <Box>
        <Flex justifyContent={'space-between'} alignItems={'center'} width={'160px'}>
        <IoMdNotificationsOutline size={25} />
        <TmsHeaderDropDown />
        <TmsHeaderAdmin />
        </Flex>
        </Box>
        </Flex>


    </Flex>
  )
}

export default TmsHeader