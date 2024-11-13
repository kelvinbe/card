import { CREATE_TERMINAL, http_methods } from '@/api/constants'
import { TerminalsData } from '@/mock/terminal'
import React, {createContext, useState} from 'react'
import { useCookies } from 'react-cookie'
import { SETTINGS } from '../../../settings'


export const TerminalContext = createContext()



export default function TerminalContextProvider({children}) {
  const [allTerminals, setAllTerminals] = useState(TerminalsData)
  const [cookies] = useCookies([SETTINGS.tokenCookieName]);
  const token = cookies.userToken
  console.log('tokenINTerminal', token)

       


  const createTerminal = async (
    data: {deviceName: string, deviceId: string, branchCode: string, requestType: string, deviceModel: string,bankAssetNumber: string,coopCode: string,active: number
  }) => {
    try {
      console.log('ACTIVEINCONTEXT', 
        data.deviceName,
        data.deviceId,
        data.branchCode,
        data.requestType,
        data.deviceModel,
        data.bankAssetNumber,
        data.coopCode,
        data.active
      )

      const response = await fetch(CREATE_TERMINAL, {
        method: http_methods.post,
        headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Fineract-Platform-TenantId': 'default',
              },
       body: JSON.stringify({
    deviceName: data.deviceName,
    deviceId:   data.deviceId,
    branchCode: data.branchCode,
    deviceModel:    data.deviceModel,
    requestType:     data.requestType,
    bankAssetNumber: data.bankAssetNumber,
    coopCode: data.coopCode,
    active: data.active
       }) 
      })

      const RESPONSE = response.json()

      return RESPONSE
      
    } catch (error) {
      console.log('error', error)
    }
  }



  return (
    <TerminalContext.Provider
    value={{createTerminal, allTerminals, setAllTerminals}}
    >
        {children}
        
    </TerminalContext.Provider>
  )
}

