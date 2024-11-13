import React from 'react'
import { Box, Image, Flex } from '@chakra-ui/react'
import TextComponent from '../../Atoms/Text/Text'
import KayaPlatform from '../../../assets/Kaya Payment platform.png'
import { DropDownComponent } from '../../Atoms/DropDown/DropDownComponent'
import { languages } from '@/mock/dropdownData'


const SignInHeader = () => {
  return (

    <Flex w={'100%'} alignContent={'center'} padding={'30px'} alignItems={'center'} flexDirection={'row'} justifyContent={'space-between'}>
        <Box>
        <Image src={KayaPlatform} w={'290px'} h={'25'} />
        </Box>

        <Flex justifyContent={'center'} alignItems={'center'}>
        <Box padding={5}>
        <TextComponent words='Terminal Management System' size={'md'} color='white' />
        </Box>
        <Box padding={5}>
        <DropDownComponent  data={languages} buttonWidth='100' chevronColor='white' popOverWidth='100' textColor='white'  />
        </Box>
        </Flex>
    </Flex>
  )
}

export default SignInHeader