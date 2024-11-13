import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    FormControl,
    FormLabel,
    Input,
    useToast
  } from '@chakra-ui/react'
  import React, {useContext, useState} from 'react'
import { useMutation } from "@tanstack/react-query"
import AuthContext from '@/context/AuthContext/AuthContext'
import { useNavigate } from "react-router-dom"


export function InitialFocus({isOpen, message, email, password, otp, verifyOTP}) {
    const { onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef(null)
    const [otpp, setOTP] = useState(null)
    const finalRef = React.useRef(null)
    const {mutateAsync} = useMutation({
        mutationFn: verifyOTP
      })
    const toast = useToast()
    const navigate = useNavigate()
    

    const handleVerifyOTP = async (values: FormFields) => {

      console.log('email', email)
      console.log('password', password)
      console.log('otp', otpp)

        try {
          const data = await mutateAsync({email: email, password: password, otp: otpp})
          const token = await data?.json()
        
          console.log('token', token)
          if(token){
            console.log('we got in here')
            // setCookie(SETTINGS.tokenCookieName, token.token, {secure: import.meta.env.PROD})
            // const setUser = localStorage.setItem(SETTINGS.localStorageUser, JSON.stringify(token.user))
            onClose()
            toast({
              position: 'top',
              title: `${token.body.message}`,
              status: 'info',
              duration: 3000,
              isClosable: true,
            })
            navigate('/home')
          }
        } catch (error) {
          toast({
            position: 'top',
            title: 'Error Signing in',
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
        }
      
    
      }

      console.log('otpp', otpp)
  
  
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
            <ModalHeader>Verify OTP</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>{message}</FormLabel>
                <Input value={otpp} onChange={(e) => setOTP(e.target.value)} ref={initialRef} placeholder='OTP' />
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button onClick={handleVerifyOTP}  colorScheme='blue' mr={3}>
                Sign in
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }