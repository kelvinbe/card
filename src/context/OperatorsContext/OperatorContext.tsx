import { CREATE_OPERATOR, GET_ALL_OPERATORS, http_methods } from '@/api/constants'
import { OperatorsData } from '@/mock/operators'
import React, {createContext, useState} from 'react'
import { SETTINGS } from '../../../settings'
import { useCookies } from 'react-cookie'


export const OperatorsContext = createContext()



export default function OperatorContextProvider({children}) {
  const [allOperators, setAllOperators] = useState(OperatorsData)
  const [cookies] = useCookies([SETTINGS.tokenCookieName]);
  const token = cookies.userToken
  console.log('tokenINOperator', token)




  const createOperator = async (data:{requestType: string,
    email: string,
    coopCode: string,
    branchName: string,
    address: string
  }
    
  ) => {
    try {
      const response = await fetch(CREATE_OPERATOR, {
        method: http_methods.post,
        headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Fineract-Platform-TenantId': 'default',
              },
        body: JSON.stringify({
          requestType: data.requestType,
          email: data.email,
          coopCode: data.coopCode,
          branchName: data.branchName,
          address: data.address
      }) 
      })

      const RESPONSE = response.json()
      return RESPONSE   
    } catch (error) {
      console.log('error', error)
    }
  }



  const getAllOperators = async () => {
    try {
      const response = await fetch(GET_ALL_OPERATORS, {
        method: http_methods.get,
        headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Fineract-Platform-TenantId': 'default',
              }, 
      })

      // const RESPONSE = await response.json()
      console.log('response', RESPONSE)

      setAllOperators(RESPONSE.body)
      return RESPONSE
    } catch (error) {
      console.log('error', error)
    }
  
  
  }







  return (
    <OperatorsContext.Provider
    value={{createOperator, allOperators, setAllOperators, getAllOperators}}
    >
        {children}
        
    </OperatorsContext.Provider>
  )
}

