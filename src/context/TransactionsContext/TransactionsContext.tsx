import { CREATE_TERMINAL, http_methods } from '@/api/constants'
import { TerminalsData } from '@/mock/terminal'
import { transactionsData } from '@/mock/transactions'
import React, {createContext, useState} from 'react'


export const TransactionsContext = createContext()



export default function TransactionsContextProvider({children}) {
  const [allTransactions, setAllTransactions] = useState(transactionsData)






  return (
    <TransactionsContext.Provider value={{allTransactions}}>
        {children}
    </TransactionsContext.Provider>
  )



}