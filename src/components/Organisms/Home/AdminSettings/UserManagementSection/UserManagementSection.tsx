import UserManagementCard from '@/components/Atoms/Cards/UserManagementCard/UserManagementCard'
import OperationalHeader from '@/components/Organisms/OperationalHeader/OperationalHeader'
import { UsersContext } from '@/context/UsersContext/UsersContext'
import { UsersManagementData } from '@/mock/users'
import { Box, Spinner } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { Loader, Plus } from 'lucide-react';
import TextComponent from '@/components/Atoms/Text/Text'
import { CreateUserModal } from '@/components/Molecules/Modal/CreateUserModal'
import { Progress } from '@/components/ui/progress'



const UserManagementSection = () => {

  const {allUsers, getAllUsers} = useContext(UsersContext)
  const [open, setIsOpen] = useState(false)
  const [loading, setIsLoading] = useState(false)

  console.log('allUsers', allUsers)
  useEffect(() => {

    if(allUsers.length > 0){
      setIsLoading(false)
    }else{
      setIsLoading(true)
      getAllUsers()
    }

  }, [loading,allUsers])

  

  return (
    <Box className='flex flex-col'>
      <OperationalHeader  searchTerm=''  search buttonIcon={<Plus className="mr-2 h-4 w-4" />} buttonFunction={() => setIsOpen(true)} buttonTitle='Create User' name="Users" />
      {open && <CreateUserModal isOpen={open} setIsOpen={setIsOpen} />}
      <Box padding={2} className='flex start' style={{ marginBottom: '20px' }} bg={'#F8F8F8'}>
                <Box className='w-40 ml-10'>
                <TextComponent words='#' weight='500'  color='#5D5C5C' />
                </Box>
                <Box className='w-40'>
                <TextComponent words='NAME' weight='500' color='#5D5C5C' />
                </Box>
                <Box className='w-40'>
                <TextComponent words='EMAIL' weight='500' color='#5D5C5C' />
                </Box>
                <Box className='w-40'>
                <TextComponent words='USER ROLE' weight='500' color='#5D5C5C' />
                </Box>
                <Box className='w-40'>
                <TextComponent words='ACTIONS' weight='500' color='#5D5C5C' />
                </Box>
                </Box>
               { !loading ?  <>
    {allUsers?.map((user) => {
    return <UserManagementCard name={user.username} userId={user.id} email={user.email} type={user.userType} />
    })}  
    </> : <Box className='flex justify-center items-center'>
      <Spinner
  thickness='4px'
  speed='0.65s'
  emptyColor='gray.200'
  color='blue.500'
  size='lg'
/> </Box>    }
    </Box>
  )
}

export default UserManagementSection