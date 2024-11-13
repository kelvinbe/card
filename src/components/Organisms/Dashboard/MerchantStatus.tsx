import TextComponent from '@/components/Atoms/Text/Text'
import { Box } from '@chakra-ui/react'
import React from 'react'
import StatusBlinker from '@/components/Atoms/StatusBlinker/StatusBlinker'
import TotalsComponent from '@/components/Atoms/TotalsComponent/TotalsComponent'
import DashboardMiniHeader from '@/components/Molecules/Home/DashboardHeader/DashboardHeader'
import { Progress } from '@/components/ui/progress'
import { MerchantStatusData } from '@/mock/merchants'

const MerchantStatus = () => {
  return (
    <Box className='w-full'>
      <TextComponent weight='500' words='MERCHANT STATUS' />
      <Box className='w-full border mb-3 mt-1'></Box>
      <Box className='flex w-full justify-between pb-10 pt-5'>
      <TotalsComponent title='TOTAL MERCHANTS' total={1200} />
      <Box>
      {MerchantStatusData.map((merchant) => {
          return <StatusBlinker status={merchant.status} total={merchant.total}  />
      })}
      </Box>
      </Box>
      <Box>
        <DashboardMiniHeader headerName='Merchant usage' headerName2='New merchant' />
      </Box>
    </Box>
  )
}

export default MerchantStatus