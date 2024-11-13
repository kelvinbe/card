import { CreateMerchantForm } from "@/components/Molecules/Home/CreateMerchant/CreateMerchantForm"
import { Box } from "@chakra-ui/react"

export const CreateMerchant = () => {
    return (
        <Box className='px-20 py-3'>
            <CreateMerchantForm />
        </Box>
    )
}