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
    Select
  } from '@chakra-ui/react'
import AuthContext from '@/context/AuthContext/AuthContext'
import { useNavigate } from "react-router-dom"
import { Box } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
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


interface IInitialFocus {
  isOpen: boolean;
  updateUser: () => void
  onClose: () => void
  setIsOpen: () => void;
  userId: number
}

export function CreateUserModal(props: IInitialFocus) {
      const { onOpen, onClose } = useDisclosure()

    const {isOpen, updateUser, setIsOpen, userId} = props
    const {editUser} = useContext(UsersContext)
    const initialRef = React.useRef(null)
    const [otpp, setOTP] = useState(null)
    const finalRef = React.useRef(null)
    const [userType, setUserType] = useState('')
    const {createUser}  = useContext(UsersContext)
  const toast = useToast()

  const mutate = useMutation({
    mutationFn: createUser,
  })
  

  const formSchema = z.object({
    email: z.string().email().min(5, {
      message: "Email is invalid.",
    }),
    userName: z.string().min(2, {
      message: "UserName is not invalid.",
    }),
    userType: z.string().min(2, {
      message: "UserType is invalid.",
    }),
  })

 

type FormFields = z.infer<typeof formSchema>
      
const form = useForm<FormFields>({
          resolver: zodResolver(formSchema),
         defaultValues:{
            email: "",
            userName: "",
            userType: ""
          }
          
        })
      
      const initateCreateUser = async (values: FormFields) => {

        console.log('values', values)

        try {
          const data = await mutate.mutateAsync({email: values.email, username: values.userName, userType: values.userType})
          const response = await data?.json()
        
          console.log('response', response)
          if(response.first_authentication){
            toast({
              position: 'top',
              title: `User Created Successful`,
              status: 'success',
              duration: 3000,
              isClosable: true,
            })
            }else{
              toast({
                position: 'top',
                title: `User Creation Failed`,
                status: 'error',
                duration: 3000,
                isClosable: true,
              })
            }
          
        } catch (error) {
          toast({
              position: 'top',
              title: `User Creation Failed`,
              status: 'error',
              duration: 3000,
              isClosable: true,
          })
          
        } 
  }
  
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
            <ModalHeader>Create User</ModalHeader>
            <ModalBody pb={6}>
            <Form {...form}>
     <form onSubmit={form.handleSubmit(initateCreateUser)} className="w-full">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <Box className='flex w-full'>
              <Box className='flex w-[120px] justify-start'>
            <TextComponent mt={2} mr='10px' words='Email'  />
            </Box>
            <FormItem className='w-full flex flex-col'>
              <FormControl style={{marginBottom: '20px'}}>
                <Input placeholder="Enter email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
            </Box>
          )}
        />

        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <Box className='flex w-full'>
              <Box className='flex w-[120px] justify-start'>
            <TextComponent mt={2} mr='10px' words='Username'  />
            </Box>
            <FormItem className='flex w-full flex-col'>
              <FormControl style={{marginBottom: '20px'}}>
                <Input placeholder="Enter user name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
            </Box>
          )}
        />

        <FormField
          control={form.control}
          name="userType"
          render={({ field }) => (
            <Box className='flex w-full'>
            <Box className='flex w-[120px] justify-start'>
            <TextComponent mt={2} mr='10px' words='User Type'  />
            </Box>
            <FormItem className='w-full'>
            <Select placeholder='Select user type' onChange={field.onChange} defaultValue={field.value}>
              {userTypesData.map((type) => {

            return <option value={type.value}>{type.label}</option>

              })}

</Select>
            </FormItem>
            </Box>
          )}
        />
           <Flex className='justify-evenly items-center'>
        <Button  className='rounded-full border-[#0A4DA1] h-[30px] text-[#0A4DA1]' onClick={() => setIsOpen(false)} color='#0A4DA1' variant={'outline'} size={'lg'} type="button">Cancel</Button>
        <Button disabled={form.formState.isSubmitting} style={{width: '30%', height: '30px', borderRadius: '20px', backgroundColor: '#0A4DA1', marginTop: '10px'}} size={'lg'} type="submit">{form.formState.isSubmitting ? <Loader2 color="#70B3E2" className="animate-spin" /> : 'Create User'}</Button>

        </Flex>
      </form>
    </Form>
            </ModalBody>
  
            {/* <ModalFooter>
              <Button onClick={handleUpdateUser}  colorScheme='blue' mr={3}>
                Sign in
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter> */}
          </ModalContent>
        </Modal>
      </>
    )
  }