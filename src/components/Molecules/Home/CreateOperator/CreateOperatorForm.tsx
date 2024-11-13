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

const CreateOperatorForm = () => {
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
    requestType: z.string().min(5, {
      message: "request type  cannot be empty",
    }),
    email: z.string().email().min(2, {
      message: "email cannot be empty",
    }),
    coopCode: z.string().min(2, {
      message: "coop code cannot be empty",
    }),
    branchName: z.string().min(2, {
      message: "branch name cannot be empty",
    }),
    address: z.string().min(2, {
      message: "address cannot be empty",
    }),
  })



  type FormFields = z.infer<typeof formSchema>



  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      requestType: "",
      email: "",
      coopCode: "",
      branchName: "",
      address: "",
    }
  })

  const handleFormSubmit = async (values: FormFields) => {

    try {
      const response = await mutateAsync({
        requestType: values.requestType,
        email: values.email,
        coopCode: values.coopCode,
        branchName: values.branchName,
        address: values.address,
      })

      const operator = response

      console.log('isSuccessINMUTATE', operator)
      console.log('isSuccessINMUTATTTTTTTTTTTTTTTttE', isSuccess)
      if (response?.statusCode === 'CREATED') {
        toast({
          position: 'top',
          title: 'Operator created.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })

      }

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
      <OperationalHeader isLoading={isPending} buttonFunction={() => formRef.current.requestSubmit()} buttonTitle='Save Operator' name='Set up operator' />

      <Box w='100%' height={'300px'} style={{ boxShadow: '10 10' }} rounded={30} display={'flex'} justifyContent={'space-evenly'} alignItems={'center'}
        p={15}>
        <TablesNavigationBar mb={118} link1='/createTerminal' link2='/operators' title='Operators' navLink1Name='Set up operators' navLink2Name='List of operators' />

        <Form {...form}>
          <form ref={formRef} onSubmit={form.handleSubmit(handleFormSubmit)} className="w-full flex justify-evenly">
            <Box w={'40%'}>
              <Box padding={2}>
                <TextComponent words='Operator information' color='#A1A1A1' />
              </Box>
              <FormField
                control={form.control}
                name="branchName"
                render={({ field }) => (
                  <Box style={{ marginBottom: '20px' }} display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
                       <Box className='w-[150px] flex justify-end'>
                  <TextComponent mt={2} mr='10px' words='Branch Name'  />
                  </Box>
                    <FormItem className="w-3/4">
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </Box>

                )}
              />
              <FormField
                control={form.control}
                name="coopCode"
                render={({ field }) => (
                  <Box style={{ marginBottom: '20px' }} display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
                       <Box className='w-[150px] flex justify-end'>
                  <TextComponent mt={2} mr='10px' words='Coop Code'  />
                  </Box>
                    <FormItem className="w-3/4">
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </Box>

                )}
              />

              <FormField
                control={form.control}
                name="requestType"
                render={({ field }) => (
                  <Box style={{ marginBottom: '20px' }} display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
                      <Box className='w-[150px] flex justify-end'>
                  <TextComponent mt={2} mr='10px' words='Request Type'  />
                  </Box>
                    <FormItem className="w-3/4">
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </Box>

                )}
              />
            </Box>
            <Box w={'40%'}>
              <Box padding={2}>
                <TextComponent words='Email address' color='#A1A1A1' />
              </Box>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <Box style={{ marginBottom: '20px' }} display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
                    <Box className='w-[125px] flex justify-end'>
                                            <TextComponent mt={2} mr='10px' words='Email Address'  />
                      </Box>
                    <FormItem className="w-3/4">
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </Box>

                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <Box style={{ marginBottom: '20px' }} display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
                    <Box className='w-[125px] flex justify-end'>
                      <TextComponent mt={2} mr='10px' words='Address'  />
                      </Box>
                    <FormItem className="w-3/4">
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
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

export default CreateOperatorForm