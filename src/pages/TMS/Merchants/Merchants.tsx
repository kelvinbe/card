import { columns } from '@/components/Organisms/Home/Merchants/Columns'
import { MerchantsTable } from '@/components/Organisms/Home/Merchants/MerchantsTable'
import { MerchantContext } from '@/context/MerchantContext/MerchantContext'
import { Box } from '@chakra-ui/react'
import {useContext} from 'react'

const Merchants = () => {
  const {merchants} = useContext(MerchantContext)


  return (
    <Box className='px-20 py-3'>
        <Box className='mb-6'>
        </Box>
      <MerchantsTable data={merchants} columns={columns} />
    </Box>
  )
}

export default Merchants