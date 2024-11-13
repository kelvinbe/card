import React, { useState } from 'react'
import { Box } from '@chakra-ui/react'
import DropDown from '@/components/Atoms/DropDown/DropDown'
import BadgeInfo from '@/components/Atoms/BadgeInfo/BadgeInfo'
import TextComponent from '@/components/Atoms/Text/Text'
import { TrendingDown, TrendingUp } from 'lucide-react'

const TransactionSummary = ({onMonthChange, selectedMonthData}) => {
  const [selectedMonth, setSelectedMonth] = useState('All')

  const arr = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'All'
  ]

  const newArr = arr.splice(0, 13)

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month)
    onMonthChange(month)

  }

  console.log('selectedMonthData', selectedMonthData)

  return (
    <Box className='w-[200px]'>
      <Box className='w-full mb-4'>
      <DropDown selected={selectedMonth} data={newArr} onSelect={handleMonthChange} />
      </Box>
      <Box className='pb-5'>
      <BadgeInfo title='Transaction amount' color='#BCDAEE' />
      <Box className='flex justify-start items-center'>
      <TextComponent color={'#000'} words={`₱ ${selectedMonthData.TransactionAmount}`} weight='700' size={'30px'} />
      <TrendingDown size={20} style={{marginLeft: 5}} color='#C40320' />
      </Box>
      <TextComponent color={'#000'} words='8% decrease(This month)' size={'12px'} />
      </Box>
      <Box className='pb-5'>
      <BadgeInfo title='Transaction volume' color='#BCDAEE' />
      <Box className='flex justify-start items-center'>
      <TextComponent color={'#000'} words={`₱ ${selectedMonthData.TransactionVolume}`} weight='700' size={'30px'}   />
      <TrendingUp size={20}  style={{marginLeft: 5}} color='#00A300' />
      </Box>
      <TextComponent color={'#000'} words='10% increase(This month)' size={'12px'}  />
      </Box>
      <Box className='pb-5'>
      <BadgeInfo title='Total fees' color='#BCDAEE' />
      <Box className='flex justify-start items-center'>
      <TextComponent color={'#000'} words='₱ 10,000' weight='700' size={'30px'}  />
      <TrendingUp size={20}  style={{marginLeft: 5}} color='#00A300' />
      </Box>
      <TextComponent color={'#000'} words='10% increase(This month)' size={'12px'} />
      </Box>
    </Box>
  )
}

export default TransactionSummary