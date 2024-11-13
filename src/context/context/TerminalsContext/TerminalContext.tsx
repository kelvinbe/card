import { CREATE_TERMINAL, http_methods } from '@/api/constants'
import { TerminalsData } from '@/mock/terminal'
import React, {createContext, useState} from 'react'


export const TerminalContext = createContext()



export default function TerminalContextProvider({children}) {
  const [allTerminals, setAllTerminals] = useState(TerminalsData)


  const createTerminal = async (name, id, date, createdBy, model, serialNo, stock, status) => {
    try {
      const response = await fetch(CREATE_TERMINAL, {
        method: http_methods.post,
        headers: {
                'Content-Type': 'application/json',
                'Fineract-Platform-TenantId': 'default',
              },
       body: JSON.stringify({
        name: name, 
        id: id, 
        date: date, 
        createdBy: createdBy,
        model: model, 
        serialNo: serialNo, 
        stock: stock, 
        status: status

       }) 
      })

      return response
      
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

