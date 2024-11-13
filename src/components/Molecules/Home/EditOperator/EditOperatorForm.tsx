import React, { useState, useContext, useEffect, useRef } from 'react'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { SignIn } from "@/api/Auth/api"
import { useMutation } from "@tanstack/react-query"
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import { date, z } from "zod"
import { Box, IconButton, useToast } from "@chakra-ui/react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import TextComponent from '@/components/Atoms/Text/Text';
import { Loader2 } from "lucide-react"
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../../../../index.css'
import OperationalHeader from '@/components/Organisms/OperationalHeader/OperationalHeader';
import { TerminalsData } from '@/mock/terminal';
import TablesNavigationBar from '@/components/Organisms/TablesNavigationBar/TablesNavigationBar';
import { OperatorsContext } from '@/context/OperatorsContext/OperatorContext';

const EditOperatorForm = ({operator}) => {
  const [formData, setFormData] = useState({});
  const [startDate, setStartDate] = useState(new Date());

  const { handleSubmit, control } = useForm();

  const toast = useToast()
  const navigate = useNavigate()
  const formRef = useRef()

  const { createOperator, allOperators, setAllOperators } = useContext(OperatorsContext)
  const { mutate, isSuccess, isError, isPending, mutateAsync } = useMutation({
    mutationFn: createOperator
  })
  



  const formSchema = z.object({
    name: z.string().min(5, {
      message: "name cannot be empty",
    }),
    id: z.string().min(2, {
      message: "id cannot be empty",
    }),
    merchant: z.string().min(2, {
      message: "merchant cannot be empty",
    }),
    email: z.string().email().min(2, {
      message: "email cannot be empty",
    }),
    contact: z.string().min(2, {
      message: "contact cannot be empty",
    }),
    status: z.string().min(2, {
      message: "status cannot be empty",
    }),
  })

  console.log('operator', operator)

  type FormFields = z.infer<typeof formSchema>

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      id: "",
      merchant: "",
      email: "",
      contact: "",
      status: ""
    }
  })

  useEffect(() => {
    if(operator){
      form.reset({
        name: operator?.name,
        id: operator?.id,
        merchant: operator.merchant,
        email: operator.terminal_id,
        contact: operator.serial_no,
        status: operator?.status,
      })
    }
  }, [operator, form])

  const handleFormSubmit = async (values: FormFields) => {

    try {
      const response = await mutateAsync({
        name: values.name,
        id: values.id,
        merchant: values.merchant,
        email: values.email,
        contact: values.contact,
      })

      const operator = response

      console.log('isSuccessINMUTATE', operator)
      console.log('isSuccessINMUTATTTTTTTTTTTTTTTttE', isSuccess)
      if (response?.ok) {
        toast({
          position: 'top',
          title: 'Operator created.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        }) 

        const newOperator = {
          id: values.id, 
          name: values.name,
          merchant: values.merchant,
          email: values.email,
          contact: values.contact,
          status: 'Inactive',
          operators: "View Details"

          
        };
 setAllOperators(prevOperators => [...prevOperators, newOperator])
 console.log('allOperators', allOperators)

      }
        // form.reset()
        // setStartDate(new Date())
    } catch (error) {
      console.log(error)
      if (isError) {
        toast({
          position: 'top',
          title: 'Operator creation failed.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }

    }
  };

  useEffect(() => {
    console.log(allOperators)
  }, [allOperators]);


  return (
    <Box>
      <Box className='w-full flex'>
      <TablesNavigationBar link1='/operators' link2='' title='Operators' navLink1Name='List of operators' navLink2Name={operator?.name}  />

          <Box className=' flex flex-col w-full justify-start mt-[-4px]'>
          <Box className='w-[30%] mb-3 '>
            <Box>
            <TextComponent words={operator?.name} weight='700' size={'24px'} />
            </Box>

          </Box>
          <Box className='w-full border mb-3'></Box>
          </Box>

       </Box>

      <Box w='100%' height={'300px'} className='mt-[-90px] ml-20' style={{ boxShadow: '10 10' }} rounded={30} display={'flex'} justifyContent={'space-evenly'} alignItems={'center'}
        p={15}>

          <Box>
          </Box>

        <Form {...form}>
          <form ref={formRef} onSubmit={form.handleSubmit(handleFormSubmit)} className="w-full flex justify-evenly">
            <Box w={'40%'}>
              <Box padding={2}>
                <TextComponent words='Operator information' color='#A1A1A1' />
              </Box>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <Box className='flex  w-full'>
                    <Box className='w-[95px] flex justify-end'>
                  <TextComponent mt={2} mr='10px' words='Name'  />
                  </Box>
                  <FormItem className='w-full'>
                    <FormControl style={{ marginBottom: '20px' }}>
                      <Input  placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  </Box>
                )}
              />

              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <Box className=' flex  w-full'>
                    <Box className='w-[95px] flex justify-end'>
              <TextComponent mt={2} mr='10px' words='ID'  />
              </Box>
                  <FormItem className='w-full'>
                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                      <FormControl style={{ marginBottom: '10px' }}>
                        <Input placeholder="ID"  {...field} />
                      </FormControl>
                      <Box marginBottom={10} marginTop={'33px'} display={'flex'} justifyContent={'center'} alignItems={'center'} marginLeft={'20%'} position={'absolute'}>

                      </Box>
                    </Box>
                    <FormMessage />
                  </FormItem>
                  </Box>
                )}
              />


              <FormField
                control={form.control}
                name="merchant"
                render={({ field }) => (
                  <Box className='flex  w-full'>
                    <Box className='w-[83px] flex justify-end'>
              <TextComponent mt={2} mr='10px' words='Merchant'  />
              </Box>
                  <FormItem className='w-full'>
                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                      <FormControl style={{ marginBottom: '5px' }}>
                        <Input placeholder="Merchant"  {...field} />
                      </FormControl>
                    </Box>
                    <FormMessage />
                  </FormItem>
                  </Box>
                )}
              />
            </Box>
            <Box w={'40%'}>
              <Box padding={2}>
                <TextComponent words='Contact info' color='#A1A1A1' />
              </Box>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <Box className='flex  w-full'>
                    <Box className='w-[83px] flex justify-end'>
              <TextComponent mt={2} mr='10px' words='Email'  />
              </Box>
                  <FormItem className='w-full'>
                    <FormControl style={{ marginBottom: '20px' }}>
                      <Input placeholder="Email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  </Box>
                )}
              />
                <Box>
              </Box>

              <FormField
                control={form.control}
                name="contact"
                render={({ field }) => (
                  <Box className='flex  w-full'>
                    <Box className='w-[83px] flex justify-end'>
              <TextComponent mt={2} mr='10px' words='Contact'  />
              </Box>
                  <FormItem className='w-full'>
                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                      <FormControl style={{ marginBottom: '10px' }}>
                        <Input placeholder="Contact No."  {...field} />
                      </FormControl>
                      <Box marginBottom={10} marginTop={'33px'} display={'flex'} justifyContent={'center'} alignItems={'center'} marginLeft={'20%'} position={'absolute'}>

                      </Box>
                    </Box>
                    <FormMessage />
                  </FormItem>
                  </Box>
                )}
              />
                <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <Box className='flex  w-full'>
                    <Box className='w-[83px] flex justify-end'>
              <TextComponent mt={2} mr='10px' words='Status'  />
                    </Box>
                  <FormItem className='w-full'>
                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                      <FormControl style={{ marginBottom: '10px' }}>
                        <Input placeholder="Status"  {...field} />
                      </FormControl>
                      <Box marginBottom={10} marginTop={'33px'} display={'flex'} justifyContent={'center'} alignItems={'center'} marginLeft={'20%'} position={'absolute'}>
                      </Box>
                    </Box>
                    <FormMessage />
                  </FormItem>
                  </Box>
                )}
              />
            </Box>
          </form>
        </Form>
      </Box>
    </Box>
  )
}

export default EditOperatorForm