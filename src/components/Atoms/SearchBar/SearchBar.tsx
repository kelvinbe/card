import React from 'react'
import { Input } from '@/components/ui/input'
import { Search2Icon } from '@chakra-ui/icons'
import { Box, Flex } from '@chakra-ui/react'


interface ISearchBar{
    width: string
    ml?: string
    mr?: string
    height: string
    onSearch?: () => void
}




const SearchBar = (props: ISearchBar) => {

    const {width, ml, mr, onSearch, height} = props
    console.log('width', width)
  return (
    <Flex ml={ml} mr={mr} >
        <Search2Icon color={'#696969'} w={'11px'}   position={'absolute'} marginTop={4} marginLeft={'11px'}    />
        <Input placeholder='Search...' onChange={onSearch} className={`rounded-3xl p-5 w-full h-${height} border-2 bg-white focus:outline-none border-2 focus:outline-none	focus-visible:ring-0 focus-visible:ring-offset-0`}  />
    </Flex>
  )
}

export default SearchBar