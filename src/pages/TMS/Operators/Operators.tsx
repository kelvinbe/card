import OperatorsTable from '@/components/Organisms/Home/Operators/OperatorsTable'
import TmsTable from '@/components/Organisms/Home/Terminals/TmsTable'
import { Box, Spinner } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { columns } from '@/components/Organisms/Home/Operators/Columns'
import { TerminalContext } from '@/context/TerminalsContext/TerminalContext'
import { OperatorsData } from '@/mock/operators'
import { OperatorsContext } from '@/context/OperatorsContext/OperatorContext'

const Operators = () => {
  const {allOperators, getAllOperators} = useContext(OperatorsContext)
  const [loading, setIsLoading] = useState(false)

  useEffect(() => {

    if(allOperators.length > 0){
      setIsLoading(false)
    }else{
      setIsLoading(true)
      getAllOperators()
    }

  }, [loading, allOperators])

  return (
    <>
   {loading ? 
    <Box className='flex justify-center items-center'>
    <Spinner
    thickness='4px'
    speed='0.65s'
    emptyColor='gray.200'
    color='blue.500'
    size='lg'
  /> 
  </Box>
  
  
  :  <Box className='px-20 py-3'>
          <Box className='mb-6'>
          </Box>
          <OperatorsTable data={allOperators} columns={columns}  />
        </Box>
       }
       </>
  )
}

export default Operators