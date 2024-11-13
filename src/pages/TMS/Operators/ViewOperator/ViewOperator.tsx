import EditOperatorForm from '@/components/Molecules/Home/EditOperator/EditOperatorForm'
import { OperatorsContext } from '@/context/OperatorsContext/OperatorContext'
import { extractSpecificObjects } from '@/utils/utils'
import { Box, useStatStyles } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ViewOperator = () => {

  const {allOperators} = useContext(OperatorsContext)
  const params = useParams()
  console.log('paramss', params)
  const [operator, setOperator] = useState(null)

  const operatorId = params?.operatorId
  console.log('operatorId', operatorId)

  useEffect(() => {

    for(let i = 0; i <= allOperators.length; i++){
      if(allOperators.length > 0){
        if(allOperators[i]?.id === Number(operatorId)){
          setOperator(allOperators[i])
          break
        }
      }
}

  }, [allOperators])

  return (
    <Box className='px-20 py-3'>
        <EditOperatorForm operator={operator}  />
    </Box>
  )
}

export default ViewOperator