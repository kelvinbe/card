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
import { TerminalContext } from '@/context/TerminalsContext/TerminalContext';
import { TerminalsData } from '@/mock/terminal';
import TablesNavigationBar from '@/components/Organisms/TablesNavigationBar/TablesNavigationBar';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { StatusData, terminalsAssigned, terminalCreationRequestType } from '@/mock/dropdownData';

const CreateTerminalForm = () => {
  const [formData, setFormData] = useState({});
  const [startDate, setStartDate] = useState(new Date());

  const { handleSubmit, control } = useForm();

  const toast = useToast()
  const navigate = useNavigate()
  const formRef = useRef()

  const { createTerminal, allTerminals, setAllTerminals } = useContext(TerminalContext)
  const { mutate, isSuccess, isError, isPending, mutateAsync } = useMutation({
    mutationFn: createTerminal
  })




  const formSchema = z.object({
    deviceName: z.string().min(5, {
      message: "device name cannot be empty",
    }),
    deviceId: z.string().min(2, {
      message: "device id cannot be empty",
    }),
    branchCode: z.string().min(2, {
      message: "branch code cannot be empty",
    }),
    requestType: z.string().min(2, {
      message: "request type by cannot be empty",
    }),
    deviceModel: z.string().min(2, {
      message: "device model cannot be empty",
    }),
    bankAssetNumber: z.string().min(2, {
      message: "bank asset nummber cannot be empty",
    }),
    coopCode: z.string().min(2, {
      message: "coop code cannot be empty.",
    }),
    active: z.string().min(2, {
      message: "status cannot be empty.",
    }),
  })



  type FormFields = z.infer<typeof formSchema>

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      deviceName: "",
      deviceId: "",
      branchCode: "",
      deviceModel: "",
      bankAssetNumber: "",
      requestType: "",
      coopCode: "",
      active: "",
    }
  })



  const handleFormSubmit = async (values: FormFields) => {
    console.log('i was hit today')

    try {
      const response = await mutateAsync({
      deviceName: values.deviceName,
      deviceId: values.deviceId,
      branchCode: values.branchCode,
      deviceModel: values.deviceModel,
      bankAssetNumber: values.bankAssetNumber,
      coopCode: values.coopCode,
      requestType: values.requestType,
      active: 1,
      })

      const terminal = response

      console.log('isSuccessINMUTATE', terminal)
      console.log('isSuccessINMUTATTTTTTTTTTTTTTTttE', isSuccess)
      if (response?.statusCode === "OK") {
        toast({
          position: 'top',
          title: `${response?.body}`,
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
          title: 'Terminal creation failed.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }

    }



  };

  useEffect(() => {
    console.log(allTerminals)
  }, [allTerminals]);


  return (
    <Box>
      <OperationalHeader isLoading={isPending} buttonFunction={() => formRef.current.requestSubmit()} buttonTitle='Save Terminal' name='Set up terminal' />

      <Box w='100%' height={'300px'} style={{ boxShadow: '10 10' }} rounded={30} display={'flex'} justifyContent={'space-evenly'} alignItems={'center'}
        p={15}>
        <TablesNavigationBar mb={118} link1='/createTerminal' link2='/availableTerminals' title='Terminals' navLink1Name='Set up terminal' navLink2Name='List of terminals' />

        <Form {...form}>
          <form ref={formRef} onSubmit={form.handleSubmit(handleFormSubmit)} className="w-full flex justify-evenly">
            <Box w={'40%'}>
              <Box padding={2}>
                <TextComponent words='Device information' color='#A1A1A1' />
              </Box>
              <FormField
                control={form.control}
                name="deviceName"
                render={({ field }) => (
                  <Box style={{ marginBottom: '20px' }} display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
                  <Box className='w-[150px] flex justify-end'>
                  <TextComponent mt={2} mr='10px' words='Device Name'  />
                  </Box>
                    <FormItem className="w-3/4">
                      <FormControl>
                        <Input {...form.register("name", { required: true })} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </Box>

                )}
              />
              <FormField
                control={form.control}
                name="deviceId"
                render={({ field }) => (
                  <Box style={{ marginBottom: '20px' }} display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
                  <Box className='w-[150px] flex justify-end'>
                  <TextComponent mt={2} mr='10px' words='Device ID'  />
                  </Box>
                    <FormItem className="w-3/4">
                      <FormControl>
                        <Input  {...field} />
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
                name="branchCode"
                render={({ field }) => (
                  <Box style={{ marginBottom: '20px' }} display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
                  <Box className='w-[150px] flex justify-end'>
                  <TextComponent mt={2} mr='10px' words='Branch Code'  />
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
            <Box padding={2} mb={5}>
              </Box>
              <FormField
                control={form.control}
                name="deviceModel"
                render={({ field }) => (
                  <Box style={{ marginBottom: '20px' }} display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
               <Box className='w-[150px] flex justify-end'>
                  <TextComponent mt={2} mr='10px' words='Device Model'  />
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
                name="bankAssetNumber"
                render={({ field }) => (
                  <Box style={{ marginBottom: '20px' }} display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
                    <Box className='w-[150px] flex justify-end'>
                  <TextComponent mt={2} mr='10px' words='Bank Asset no.'  />
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
                    <Select  onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                  <SelectTrigger>
                      <SelectValue placeholder="Select" />
                  </SelectTrigger>
              </FormControl>
              <SelectContent>
                    {terminalCreationRequestType.map(type => (
                      <SelectItem value={type.value}>{type.label}</SelectItem>
                      ))}
              </SelectContent>
              </Select>
                    </FormItem>
                  </Box>

                )}
              />
              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <Box style={{ marginBottom: '20px' }} display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
                    <Box className='w-[150px] flex justify-end'>
                  <TextComponent mt={2} mr='10px' words='Status'  />
                  </Box>
                    <FormItem className="w-3/4">
                    <Select  onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                  <SelectTrigger>
                      <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
              </FormControl>
              <SelectContent>
                    {StatusData.map(type => {
                      console.log('typeValue', type.value)
                     return <SelectItem value={type.value}>{type.label}</SelectItem>
                })}
              </SelectContent>
              </Select>
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

export default CreateTerminalForm