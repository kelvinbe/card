import React, { useContext } from 'react'
import TransactionsTable from '@/components/Organisms/Home/Terminals/Transactions/TransactionsTable'
import { Box } from '@chakra-ui/react'
import { columns } from '@/components/Organisms/Home/Terminals/Transactions/Columns.tsx';
import { TerminalContext } from '@/context/TerminalsContext/TerminalContext';
import { useParams } from 'react-router-dom';
import { extractSpecificObjects } from '@/utils/utils';


const Transactions = () => {

  const {allTerminals} = useContext(TerminalContext)
  const params = useParams()
  console.log('paramss', params)

  const transactionId = params?.transactionId
  console.log('transactionId', transactionId)

  const transactions = extractSpecificObjects(allTerminals, transactionId,  'transaction')

  return (
    <Box  className='px-20 py-3'>
    <TransactionsTable data={transactions}  columns={columns}/>
    </Box>
  )
}

export default Transactions