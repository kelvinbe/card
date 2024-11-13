import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Flex,
    Select,
    Spinner
  } from '@chakra-ui/react'
import AuthContext from '@/context/AuthContext/AuthContext'
import { useNavigate } from "react-router-dom"
import { Box } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from '@/components/ui/input'
import TextComponent from '@/components/Atoms/Text/Text'
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
import { userTypesData } from '@/mock/dropdownData'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { UsersContext } from '@/context/UsersContext/UsersContext'
import { IconButton, useToast } from "@chakra-ui/react"


interface IDeleteUserModal {
  name: string
  isOpen: boolean;
  onClose?: () => void
  setIsOpen: () => void;
  userId: number
  
}

export function DeleteUserModal(props: IDeleteUserModal) {
      const { onOpen, onClose } = useDisclosure()

    const {isOpen, setIsOpen, name, userId} = props
    const {deleteUser} = useContext(UsersContext)
    const initialRef = React.useRef(null)
    const [otpp, setOTP] = useState(null)
    const finalRef = React.useRef(null)
    const [userType, setUserType] = useState('')
    const [loading, setIsLoading] = useState(false)

    const {mutateAsync} = useMutation({
        mutationFn: deleteUser
      })
    const toast = useToast()
    const navigate = useNavigate()

    

    const handleDeleteUser = async () => {

        try {
          const data = await mutateAsync({id: userId})
          

          console.log('response', data)
          setIsLoading(true)
          if(data.statusCode === "OK"){
            onClose()
            setIsLoading(false)
            setIsOpen(false)

            toast({
              position: 'top',
              title: `User Deleted Successfully`,
              status: 'success',
              duration: 3000,
              isClosable: true,
            })
          }
        } catch (error) {
          setIsLoading(false)
          toast({
            position: 'top',
            title: 'Error Deleting user',
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
        }
      
    
      }  

      useEffect(() => {
        

      }, [loading])
  
      console.log('userTypes', userTypesData)
    return (
      <>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader className='flex justify-center'>Delete User</ModalHeader>
            <ModalBody pb={6}>
          <Box>
            <TextComponent words={`Are you sure you want to delete User ${name}`} />
          </Box>
            </ModalBody>
  
            <ModalFooter justifyContent={'space-evenly'} className='flex justify-evenly items-center'>
            <Button variant={'outline'} className='rounded-full h-[35px] text-[#808080]' onClick={() => setIsOpen(false)}>Cancel</Button>

              <Button onClick={handleDeleteUser}   className='rounded-full h-[35px] bg-[#C40320]'>
              {loading ? <Spinner
  thickness='4px'
  speed='0.65s'
  emptyColor='gray.200'
  color='blue.500'
  size='sm'
/> : 'Confirm' }
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }