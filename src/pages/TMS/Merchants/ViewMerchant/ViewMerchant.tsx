import { EditMerchantForm } from "@/components/Molecules/Home/EditMerchant/EditMerchantForm"
import { MerchantContext } from "@/context/MerchantContext/MerchantContext"
import { Box } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const ViewMerchant = () => {

    const { merchants } = useContext(MerchantContext)
    const params = useParams()

    const [merchant, setMerchant] = useState(null)

    const merchantId = params?.merchantId

    useEffect(() => {
        const merchant = merchants.find((merchant) => merchant.merchantId == merchantId)
        setMerchant(merchant)

    }, [merchants])

    return (
        <Box className='px-20 py-3'>
            <EditMerchantForm merchant={merchant} />
        </Box>
    )
}