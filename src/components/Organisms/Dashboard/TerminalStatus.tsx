import TextComponent from '@/components/Atoms/Text/Text'
import { Box } from '@chakra-ui/react'
import React from 'react'
import StatusBlinker from '@/components/Atoms/StatusBlinker/StatusBlinker'
import TotalsComponent from '@/components/Atoms/TotalsComponent/TotalsComponent'
import DashboardMiniHeader from '@/components/Molecules/Home/DashboardHeader/DashboardHeader'
import { Progress } from '@/components/ui/progress'
import { TerminalStatusData } from '@/mock/terminal'

const TerminalStatus = () => {
  return (
    <Box className='w-full'>
      <TextComponent weight='500' words='TERMINAL STATUS' />
      <Box className='w-full border mb-3 mt-1'></Box>
      <Box className='flex w-full justify-between pb-10 pt-5'>
      <TotalsComponent title='TOTAL TERMINALS' total={5000} />
      <Box>
      {TerminalStatusData.map((terminal) => {
          return <StatusBlinker status={terminal.status} total={terminal.total}  />
      })}
      </Box>
      
      </Box>
      <Box className='w-full'>
        <DashboardMiniHeader headerName='Device usage' headerName2='Device stock' />
      </Box>
     
    </Box>
  )
}

export default TerminalStatus