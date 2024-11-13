import CreateTerminalForm from '@/components/Molecules/Home/CreateTerminal/CreateTerminalForm'
import OperationalHeader from '@/components/Organisms/OperationalHeader/OperationalHeader'
import { Box, useToast } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const CreateTerminal = () => {
  const toast = useToast()
  const navigate = useNavigate()



  


  return (

    <Box className='px-20 py-3'>
      <CreateTerminalForm />
    </Box>
  )
}

export default CreateTerminal