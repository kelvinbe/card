import { CREATE_TERMINAL, VERIFY_OTP_DOMAIN, http_methods } from '@/api/constants'
import { TerminalsData } from '@/mock/terminal'
import React, {ReactNode, createContext, useState} from 'react'
import { IAuthContext, IUser } from 'types'


export const AuthContext = createContext<IAuthContext>({
    user: null,
    setUser: (user: IUser) => {},
    verifyOTP: undefined
})



export default function AuthContextProvider({children}: {children: ReactNode}) {
  const [user, setUser] = useState<IUser | null>(null)


  const VerifyOTP = async (data: {email: string, password: string, otp: string}) => {

    try {
        const response = await fetch(VERIFY_OTP_DOMAIN,
            {
              method: http_methods.post,
              headers: {
                'Content-Type': 'application/json',
                'Fineract-Platform-TenantId': 'default',
              },
              body: JSON.stringify({
                email: data.email,
                password: data.password,
                otp: data.otp
              })
            },
          );
  
        return response
        
    } catch (error) {

      if(error){
        console.log(error)
      }
        
    }
}

  return (
    <AuthContext.Provider
    value={{user, setUser, VerifyOTP}}
    >
        {children}
        
    </AuthContext.Provider>
  )
}

