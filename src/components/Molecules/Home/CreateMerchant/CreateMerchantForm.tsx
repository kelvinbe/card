import TextComponent from "@/components/Atoms/Text/Text"
import OperationalHeader from "@/components/Organisms/OperationalHeader/OperationalHeader"
import TablesNavigationBar from "@/components/Organisms/TablesNavigationBar/TablesNavigationBar"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { TerminalsData } from "@/mock/terminal"
import { Box, Button, useToast } from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useContext, useEffect, useRef, useState } from "react"
import Select from 'react-select'
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useMutation } from "@tanstack/react-query"
import { MerchantContext } from "@/context/MerchantContext/MerchantContext"

export const CreateMerchantForm = () => {

    const { control } = useForm()
    const formRef = useRef()
    const toast = useToast()
    const [selectedDevices, setSelectedDevices] = useState([])
    const { createMerchant, merchants, setMerchants } = useContext(MerchantContext)
    const { mutate, isSuccess, isError, isPending, mutateAsync } = useMutation({
        mutationFn: createMerchant
    })

    const formSchema = z.object({
        name: z.string().min(5, {
            message: "Name cannot be empty",
        }),
        id: z.string().min(2, {
            message: "ID cannot be empty",
        }),
        branchCode: z.string().min(2, {
            message: "Branch code cannot be empty",
        }),
        email: z.string().min(2, {
            message: "Email cannot be empty",
        }),
        phoneNo: z.string().min(2, {
            message: "Phone No cannot be empty",
        }),
        street: z.string().min(2, {
            message: "Street cannot be empty.",
        }),
        barangay: z.string().min(2, {
            message: "Barangay cannot be empty.",
        }),
        city: z.string().min(2, {
            message: "City/Municipality cannot be empty.",
        }),
        postalCode: z.string().min(2, {
            message: "Postal code cannot be empty.",
        }),
        province: z.string().min(2, {
            message: "Province cannot be empty.",
        }),
        country: z.string().min(2, {
            message: "Country cannot be empty.",
        }),
        // devices: z.string().array().nonempty({
        //     message: "Devices cannot be empty.",
        // }),
    })

    type FormFields = z.infer<typeof formSchema>

    const form = useForm<FormFields>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            id: "",
            branchCode: "",
            email: "",
            phoneNo: "",
            street: "",
            barangay: "",
            city: "",
            postalCode: "",
            province: "",
            country: "",
            // devices: []
        }
    })

    const handleFormSubmit = async (values: FormFields) => {
        try {
            const response = await mutateAsync({
                name: values.name,
                merchantId: values.id,
                branchCode: values.branchCode,
                email: values.email,
                phoneNo: values.phoneNo,
                street: values.street,
                barangay: values.barangay,
                city: values.city,
                postalCode: values.postalCode,
                province: values.province,
                country: values.country
            })

            if (response?.ok) {
                const newMerchant = {
                    id: Math.floor(Math.random() * 3),
                    status: "Inactive",
                    name: values.name,
                    merchantId: values.id,
                    city: values.city,
                    devices: 9,
                    viewDetails: "View details",
                }

                toast({
                    position: 'top',
                    title: "Merchant created",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })
                setMerchants(prevMerchants => [...prevMerchants, newMerchant])
                console.log('allMerchants', merchants)

            }

        } catch (error) {
            if (isError) {
                toast({
                    position: 'top',
                    title: "Failed to create merchant",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })
            }
        }

    }

    useEffect(() => {
        console.log(merchants)
    }, [merchants]);

    return (
        <Box>
            <OperationalHeader name="Set up merchant" buttonTitle="Save merchant" buttonFunction={() => formRef.current.requestSubmit()} isLoading={isPending} />
            <Box w='100%' style={{ boxShadow: '10 10' }} rounded={30} display={'flex'} justifyContent={'space-evenly'} p={15}>
                <TablesNavigationBar title="Merchants" navLink1Name="List of merchants" navLink2Name="Set up merchant"
                    link1="/merchants" link2="/createMerchant" />

                <Form {...form}>
                    <form ref={formRef} onSubmit={form.handleSubmit(handleFormSubmit)} className="w-full flex justify-evenly">
                        <Box w={'40%'}>
                            <Box padding={2}>
                                <TextComponent words='Merchant details' color='#A1A1A1' />
                            </Box>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <Box style={{ marginBottom: '20px' }} display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
                                          <Box className='w-[125px] flex justify-end'>
                                            <TextComponent mt={2} mr='10px' words='Name'  />
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
                                name="id"
                                render={({ field }) => (
                                    <Box style={{ marginBottom: '20px' }} display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
                                          <Box className='w-[125px] flex justify-end'>
                                        <TextComponent mt={2} mr='10px' words='ID'  />
                                            </Box>
                                        <FormItem className="w-3/4">
                                            <FormControl>
                                                <Input {...form.register("id", { required: true })} {...field} />
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
                                           <Box className='w-[125px] flex justify-end'>
                                            <TextComponent mt={2} mr='10px' words='Branch Code'  />
                                            </Box>
                                        <FormItem className="w-3/4">
                                            <FormControl>
                                                <Input {...form.register("branchCode", { required: true })} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </Box>
                                )}
                            />
                            <Box p={2}>
                                <TextComponent words='Contact info' color='#A1A1A1' />
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
                                                <Input {...form.register("email", { required: true })} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </Box>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phoneNo"
                                render={({ field }) => (
                                    <Box style={{ marginBottom: '20px' }} display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
                                        <Box className='w-[125px] flex justify-end'>
                                            <TextComponent mt={2} mr='10px' words='Contact no'  />
                                        </Box>
                                        <FormItem className="w-3/4">
                                            <FormControl>
                                                <Input {...form.register("phoneNo", { required: true })} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </Box>
                                )}
                            />
                            <Box p={2}>
                                <TextComponent words='Link device' color='#A1A1A1' />
                            </Box>
                            <Box display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
                            <Box className='w-[125px] flex justify-end'>
                            <TextComponent mt={2} mr='10px' words='Link device'  />
                            </Box>
                                <Box className="w-3/4">
                                    <Select
                                        options={TerminalsData.map(device => ({ label: device.name, value: device.terminal_id }))}
                                        isMulti
                                        onChange={opt => setSelectedDevices(opt)}
                                    />
                                </Box>
                            </Box>
                        </Box>
                        <Box w={'40%'}>
                            <Box p={2}>
                                <TextComponent words='Physical address' color='#A1A1A1' />
                            </Box>
                            <FormField
                                control={form.control}
                                name="street"
                                render={({ field }) => (
                                    <Box style={{ marginBottom: '20px' }} display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
                                        <Box className='w-[125px] flex justify-end'>
                                            <TextComponent mt={2} mr='10px' words='Street Address'  />
                                        </Box>
                                        <FormItem className="w-3/4">
                                            <FormControl>
                                                <Input {...form.register("street", { required: true })} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </Box>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="barangay"
                                render={({ field }) => (
                                    <Box style={{ marginBottom: '20px' }} display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
                                        <Box className='w-[125px] flex justify-end'>
                                            <TextComponent mt={2} mr='10px' words='Barangay'  />
                                        </Box>
                                        <FormItem className="w-3/4">
                                            <FormControl>
                                                <Input {...form.register("barangay", { required: true })} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </Box>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <Box style={{ marginBottom: '20px' }} display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
                                         <Box className='w-[130px] flex justify-end'>
                                            <TextComponent mt={2} mr='10px' words='City/Municipality'  />
                                        </Box>
                                        <FormItem className="w-3/4">
                                            <FormControl>
                                                <Input {...form.register("city", { required: true })} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </Box>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="postalCode"
                                render={({ field }) => (
                                    <Box style={{ marginBottom: '20px' }} display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
                                      <Box className='w-[130px] flex justify-end'>
                                            <TextComponent mt={2} mr='10px' words='Street Address'  />
                                        </Box>
                                        <FormItem className="w-3/4">
                                            <FormControl>
                                                <Input {...form.register("postalCode", { required: true })} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </Box>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="province"
                                render={({ field }) => (
                                    <Box style={{ marginBottom: '20px' }} display={'flex'} alignItems={'center'} justifyContent={'flex-end'} >
                                        <TextComponent words='Province/Region' className="w-1/4" />
                                        <div >&emsp;</div>
                                        <FormItem className="w-3/4">
                                            <FormControl>
                                                <Input {...form.register("province", { required: true })} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </Box>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="country"
                                render={({ field }) => (
                                    <Box style={{ marginBottom: '20px' }} display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
                                        <TextComponent words='Country' className="w-1/4" />
                                        <div >&emsp;</div>
                                        <FormItem className="w-3/4">
                                            <FormControl>
                                                <Input {...form.register("country", { required: true })} {...field} />
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

