import { DropDownComponent } from '@/components/Atoms/DropDown/DropDownComponent';
import FilterComponent from '@/components/Atoms/FilterComponent/FilterComponent';
import SearchBarDefacto from '@/components/Atoms/SearchBar/SearchBarDefacto';
import TextComponent from '@/components/Atoms/Text/Text';
import { languages, terminalsAssigned } from '@/mock/dropdownData';
import { Box, Flex } from '@chakra-ui/react';
import { IOperationalHeader } from 'types';
import ButtonComponent from '@/components/Atoms/Button/ButtonComponent';




const OperationalHeader = (props: IOperationalHeader) => {
    const {name, dropDown, search, filter, create, table, onSearch, searchTerm, handleSearch, buttonTitle, buttonFunction, buttonIcon, isLoading, filterData} = props

  return (
    <Box className='flex justify-between items-center w-full py-4'>
        <TextComponent words={name} color='#000' size={'lg'} weight='700' />
        <Flex className='flex justify-center items-center'>
         {dropDown && <Box  m={2}>
        <DropDownComponent borderRadius='full'  buttonWidth='150'  textColor='#000' data={terminalsAssigned} popOverWidth='100'  />
        </Box>}
       {search && <Box m={2}>
        <SearchBarDefacto handleSearch={handleSearch} searchTerm={searchTerm} onSearch={onSearch} data={languages} />
        </Box>}
       {filter && <Box  m={2}>
        <FilterComponent filterData={filterData} table={table} />
        </Box>}
        <Box  m={2}>
        <ButtonComponent isLoading={isLoading} onClick={buttonFunction} icon={buttonIcon} title={buttonTitle} bgColor='#0A4DA1' />
        </Box>
        </Flex>
    </Box>
  )
}

export default OperationalHeader