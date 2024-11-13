import { CREATE_MERCHANT, http_methods } from "@/api/constants";
import { MerchantsData } from "@/mock/merchants";
import { createContext, useState } from "react";

export const MerchantContext = createContext()

export default function MerchantContextProvider({ children }) {
    const [merchants, setMerchants] = useState(MerchantsData)



    const createMerchant = async (name, id, status, merchantId, city, devices, viewDetails) => {
        try {
            const response = await fetch(CREATE_MERCHANT, {
                method: http_methods.post,
                headers: {
                    'Content-Type': 'application/json',
                    'Fineract-Platform-TenantId': 'default'
                },
                body: JSON.stringify({
                    name: name,
                    id: id,
                    status: status,
                    merchantId: merchantId,
                    city: city,
                    devices: devices,
                    viewDetails: viewDetails
                })
            })

            return response
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <MerchantContext.Provider value={{createMerchant, merchants, setMerchants}}>
            {children}
        </MerchantContext.Provider>
    )
}