import React, {useContext, useEffect, useState} from 'react'
import TerminalStatus from '@/components/Organisms/Dashboard/TerminalStatus'
import { Box } from '@chakra-ui/react'
import MerchantStatus from '@/components/Organisms/Dashboard/MerchantStatus'
import Map from '@/components/Organisms/Dashboard/Map'
import MapKeyHeader from '@/components/Molecules/Home/Map/MapKeyHeader/MapKeyHeader'
import TransactionsCharts from '@/components/Organisms/Dashboard/TransactionsCharts'
import TransactionInfo from '@/components/Organisms/Dashboard/TransactionSummary'
import TextComponent from '@/components/Atoms/Text/Text'
import TransactionSummary from '@/components/Organisms/Dashboard/TransactionSummary'
import { TransactionsContext } from '@/context/TransactionsContext/TransactionsContext'

const Dashboard = () => {
  const {allTransactions} = useContext(TransactionsContext)

  const [filterdChartData, setFilteredChartData] = useState(allTransactions)
  const [selectedMonthData, setSelectedMonthData] = useState(allTransactions[0])
  
  

  const handleMonthChanging = (month: string) => {
    console.log('month', month)
    if(month === 'All'){
      setFilteredChartData(allTransactions)
    }else{
      const monthName = month.slice(0, 3).toUpperCase()
      console.log('MonthName', monthName)
      setFilteredChartData(allTransactions.filter((n: { name: string }) => n.name === monthName))
    }
  }

  useEffect(() => {
    setSelectedMonthData(filterdChartData[0])
  }, [filterdChartData])
 



  return (
    <Box className='px-20 py-3 w-full'>
      <Box className='w-full p-5 bg-[#fff] h-fit rounded shadow flex justify-center items-center'>
        <Box className='mr-10 w-full'>
      <Box className='mb-10'>
      <TerminalStatus />
      </Box>
      <Box className='w-full'>
      <MerchantStatus />
      </Box>
      </Box>
      <Box className='w-[1px] h-[630px] bg-[#DDDDDD] border mb-3 mt-1 mr-5'></Box>
      <Box className='w-full'>
      <Map />
      </Box>
      </Box>

      <Box className='w-full mt-6 p-5 bg-[#fff] h-fit flex-col	 rounded shadow flex justify-between items-center'>
      <Box className='w-full mb-3'>
        <TextComponent words='TRANSACTIONS' size={'15px'} color='#000' weight='700' />
        <TextComponent words='MONTHLY TOTAL TRANSACTIONS' size={'14px'} color='#696969' />
      </Box>
        <Box className='w-full flex justify-between'>
          <TransactionsCharts data={filterdChartData} />
          <Box>
          <TransactionSummary selectedMonthData={selectedMonthData} onMonthChange={handleMonthChanging} />
        </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard