import { CREATE_USER, EDIT_USER, GET_ALL_USER, http_methods, DELETE_USER } from '@/api/constants'
import { TerminalsData } from '@/mock/terminal'
import React, {createContext, useState} from 'react'
import { useCookies } from 'react-cookie'
import { SETTINGS } from '../../../settings'
import { users } from '@/mock/users'


export const UsersContext = createContext()



export default function UsersContextProvider({children}) {
  const [allUsers, setAllUsers] = useState(users)
  const [cookies] = useCookies([SETTINGS.tokenCookieName]);
  const token = cookies.userToken
  console.log('tokennnnnnnn', token)

  const createUser = async (data: {email: string, username: string, userType: string}) => {

    try {
      const response = await fetch(CREATE_USER, {
        method: http_methods.post,
        headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Fineract-Platform-TenantId': 'default',
                
              },
       body: JSON.stringify({
        email: data.email, 
        username: data.username,
        userType: data.userType
       }) 
      })

      return response
      
    } catch (error) {
      console.log('error', error)
    }
  }

  const editUser = async (data: {username: string, userType: string, id: number}) => {
    console.log('id', data.id)
    try {
      const response = await fetch(`${EDIT_USER}/${data.id}`, {
        method: http_methods.put,
        headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Fineract-Platform-TenantId': 'default',
                
              },
       body: JSON.stringify({
        username: data.username,
        userType: data.userType
       }) 
      })

      const RESPONSE =  await response.json()
      return RESPONSE
      
    } catch (error) {
      console.log('error', error)
    }
  }

  const deleteUser = async (data: {id: number}) => {
    console.log('idINDELETE', data.id)
    try {
      const response = await fetch(`${DELETE_USER}/${data.id}`, {
        method: http_methods.delete,
        headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Fineract-Platform-TenantId': 'default',
                
              },
      })

      const RESPONSE =  await response.json()
      return RESPONSE
      
    } catch (error) {
      console.log('error', error)
    }
  }

  const getAllUsers = async () => {
    console.log('token', token)
    try {
      const response = await fetch(GET_ALL_USER, {
        method: http_methods.get,
        headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Fineract-Platform-TenantId': 'default', 
              }, 
      })
      const usersAdded = await response.json()
      setAllUsers(usersAdded.body)
      return response
      
    } catch (error) {
      console.log('error', error)
    }
  }



  return (
    <UsersContext.Provider
    value={{createUser, allUsers, setAllUsers, editUser, getAllUsers, deleteUser}}
    >
        {children}
        
    </UsersContext.Provider>
  )
}

