import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Box, IconButton, useToast } from "@chakra-ui/react"
import TextComponent from "@/components/Atoms/Text/Text"
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Loader2 } from "lucide-react"
import { resolve } from "path"
import { useContext, useEffect, useState } from "react"
import { SignIn } from "@/api/Auth/api"
import { useMutation } from "@tanstack/react-query"
import { useCookies } from 'react-cookie';
import {SETTINGS} from '../../../../settings'
import { useNavigate } from "react-router-dom"
import { AuthContext } from "@/context/AuthContext/AuthContext"
import { InitialFocus } from "../Modal/Modal"


export function SignInForm() {
  const toast = useToast()
  const [type, setType] = useState('password')
  const [cookies, setCookie, removeCookie] = useCookies([SETTINGS.tokenCookieName]);
  const navigate = useNavigate()
  const {user, setUser, VerifyOTP}  = useContext(AuthContext)
  const [isOpen, setIsOpen] = useState(false)
  const [showOtpForm, setShowOtpForm] = useState(false)

  const mutate = useMutation({
    mutationFn: SignIn,
  })
  const mutateVerify = useMutation({
    mutationFn: VerifyOTP
  })

 
  

    const formSchema = z.object({
        email: z.string().email().min(5, {
          message: "Email or Password are invalid.",
        }),
        password: z.string().min(2, {
          message: "Email or Password are invalid.",
        }),
        otp: z.string().min(2, {
          message: "OTP is invalid.",
        }).optional(),
      })

     

    type FormFields = z.infer<typeof formSchema>
          
    const form = useForm<FormFields>({
              resolver: zodResolver(formSchema),
              defaultValues: showOtpForm ? {
                email: "",
                password: "",
                otp: ""
              }: {
                email: "",
                password: "",
              }
              ,
            })
            useEffect(() => {
              if(showOtpForm){
                form.reset({
                  email: form.getValues("email"),
                  password: form.getValues('password'),
                  otp: ""
                })
              }
            }, [showOtpForm, form])
      
   
    const onRequestOTP = async (values: FormFields) => {
      try {
        const data = await mutate.mutateAsync({email: values.email, password: values.password})
        const verify = await data?.json()
      
        console.log('token', verify)
        if(verify){
          console.log('we got in here')
          setShowOtpForm(true)
          toast({
            position: 'top',
            title: `${verify.body.message}`,
            status: 'info',
            duration: 3000,
            isClosable: true,
          })
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

    const onSignIn = async (values: FormFields) => {
      try {
        console.log('MUTATE', {email: values.email, password: values.password, otp: values.otp})
        const data = await mutate.mutateAsync({email: values.email, password: values.password, otp: values.otp})
        const response = await data?.json()
      
        console.log('response', response)
        if(response.resp === "ok"){
          console.log('we got in here')
 
          setCookie(SETTINGS.tokenCookieName, 'token')

          toast({
            position: 'top',
            title: `Signin Successful`,
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
          navigate('/dashboard')
        }
      } catch (error) {
        toast({
          position: 'top',
          title: 'Error Signing in',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
    
  
    }

    

  const backColor = '#A3BCDC'

  const handleToggle = () => {
    if(type === 'password'){
      setType('')
    }else{
      setType('password')
    }

  }
  return (
    <Box w='28%' height={'300px'} style={{boxShadow: '10 10'}}  rounded={30} display={'flex'} justifyContent={'center'} alignItems={'center'} background={backColor}
    p={15}>
    <Form {...form}>
     {<form onSubmit={form.handleSubmit(onSignIn)} className="w-full">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl style={{marginBottom: '20px'}}>
                <Input placeholder="Enter email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
              <FormControl style={{marginBottom: '10px'}}>
                <Input  placeholder="Enter password" type={type} {...field} />
              </FormControl>
              <Box marginBottom={10} marginTop={'33px'} display={'flex'} justifyContent={'center'} alignItems={'center'} marginLeft={'20%'} position={'absolute'}>
              <IconButton
                variant={'none'}
                onClick={handleToggle}                
                aria-label='Search database'
                icon={type === 'password' ? <ViewOffIcon />: <ViewIcon />}
                />
                </Box>
                </Box>
                <TextComponent  words="Forgot password?" color="white" size={'sm'} />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={form.formState.isSubmitting} style={{width: '100%', height: '30px', borderRadius: '20px', backgroundColor: '#0A4DA1', marginTop: '10px'}} size={'lg'} type="submit">{form.formState.isSubmitting ? <Loader2 color="#70B3E2" className="animate-spin" /> : 'Sign In'}</Button>
      </form>}
    </Form>
    </Box>
  )
}