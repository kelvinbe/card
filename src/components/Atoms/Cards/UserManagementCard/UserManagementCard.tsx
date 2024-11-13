import { Box } from '@chakra-ui/react'
import { Pencil, Trash } from 'lucide-react';
import { useState } from 'react'
import {EditUserModal}  from '@/components/Molecules/Modal/EditUserModal';
import { DeleteUserModal } from '@/components/Molecules/Modal/DeleteUserModal';
import TextComponent from '../../Text/Text';


interface IUserManagementCard {

    name: string;
    email: string;
    type: string;
    userId: number

}




const UserManagementCard = (props: IUserManagementCard) => {
    const [open, setOpen] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    
    const {name, email, type, userId} = props

    function truncate(str: string, n: number){
        return (str.length > n) ? str.slice(0, n-1) + '...' : '';
      }

  return (
    <Box className='w-full h-[50px] flex shadow-md'>
        
        {open && <EditUserModal userId={userId} isOpen={open}  setIsOpen={() => setOpen}   />}
        {openDeleteModal && <DeleteUserModal userId={userId} name={name} isOpen={openDeleteModal}  setIsOpen={() => setOpenDeleteModal}   />}
        <Box className='flex w-full justify-start items-center'>
        <Box className='w-40 ml-10'>
        {userId}
        </Box>
        <Box className='w-40'>
        {name}
        </Box>
        <Box className='w-40'>
        {truncate(email, 15)}
        </Box>
        <Box className='w-40'>
        {type}
        </Box>
        <Box className='flex p-3'>
            <Box className='pr-1 flex justify-center items-center' onClick={() => setOpen(true)}>
        <Pencil fill='#0A4DA1' size={18} color='#0A4DA1' />
            <TextComponent words='Edit User' color='#0A4DA1' />
            </Box>
            <Box className='pr-1 ml-5 flex justify-center items-center' onClick={() => setOpenDeleteModal(true)}>
        <Trash color='#FF0026' size={18} fill='#FF0026' />
        <TextComponent words='Deactivate User' color='#FF0026' />

        </Box>
        </Box>
        </Box>
        
    </Box>
  )
}

export default UserManagementCard