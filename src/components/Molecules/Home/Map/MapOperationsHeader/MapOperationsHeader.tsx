import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { Check, ChevronsUpDown, ChevronDown, ListFilter  } from "lucide-react"
import TextComponent from '@/components/Atoms/Text/Text'
import SearchBarDefacto from '@/components/Atoms/SearchBar/SearchBarDefacto'
import Select from 'react-select'


const MapOperationsHeader = () => {
  return (
    <Box mt={-5} mb={5}>
      <Flex alignItems={'center'} className='justify-between'>
        <Flex>
      <TextComponent words='GPS LOCATION' size={'sm'} weight='700' />
      <ListFilter style={{marginLeft: 10}} size={20} />
      </Flex>
      <Box>
        <SearchBarDefacto />
      </Box>
      <Box>
        <Select />
      </Box>
      </Flex>

    </Box>
  )
}

export default MapOperationsHeader