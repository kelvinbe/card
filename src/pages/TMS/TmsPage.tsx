import TmsHeader from '@/components/Molecules/Home/TmsHeader'
import TmsNavBar from '@/components/Organisms/Home/TmsNavBar'
import { Box } from '@chakra-ui/react'
import React, { useEffect, useContext, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Outlet } from 'react-router-dom'
import { SETTINGS } from '../../../settings'
import { useNavigate } from "react-router-dom";
import ButtonComponent from '@/components/Atoms/Button/ButtonComponent'
import { AuthContext } from '@/context/AuthContext/AuthContext'



const TmsPage = () => {
  const [cookies] = useCookies([SETTINGS.tokenCookieName]);
  console.log('cookies', cookies)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)



  // useEffect(() => {
  //   if(!cookies.userToken){
  //     navigate('/signin')
      
  //   }else{
  //     setLoading(false)
  //   }
  // }, [cookies, navigate])

  // if(loading){
  //   return null
  // }
 

  return (
    <Box>
      <TmsHeader />
      <TmsNavBar />
      <Outlet />
    </Box>
  )
}

export default TmsPage