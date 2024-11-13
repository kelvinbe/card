import TextComponent from "@/components/Atoms/Text/Text"
import TablesNavigationBar from "@/components/Organisms/TablesNavigationBar/TablesNavigationBar"
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { MerchantContext } from "@/context/MerchantContext/MerchantContext"
import { TerminalsData } from "@/mock/terminal"
import { Box, FormControl, Input, Select } from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useContext, useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

export const EditMerchantForm = ({ merchant }) => {
    const { handleSubmit, control } = useForm()
    const formRef = useRef()
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

    useEffect(() => {
        if(merchant){
          form.reset({
            name: merchant?.name,
            id: merchant?.merchantId,
            branchCode: merchant.branchCode,
            email: merchant.email,
            phoneNo: merchant.phoneNo,
            street: merchant.street,
            barangay: merchant.barangay,
            city: merchant.city,
            postalCode: merchant.postalCode,
            province: merchant.province,
            country: merchant.country,
          })
        }
      }, [merchant, form])

    const handleFormSubmit = async (values: FormFields) => {}

    return (
        <Box>
            <Box className='w-full flex'>
                <TablesNavigationBar title="Merchants" navLink1Name="List of merchants" navLink2Name={`${merchant?.name} details`}
                    link1="/merchants" link2="" />

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
                                        <TextComponent words='Name' className="w-1/4" />
                                        <div >&emsp;</div>
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
                                name="id"
                                render={({ field }) => (
                                    <Box style={{ marginBottom: '20px' }} display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
                                        <TextComponent words='ID' className="w-1/4" />
                                        <div >&emsp;</div>
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
                                        <TextComponent words='Branch code' className="w-1/4" />
                                        <div >&emsp;</div>
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
                                        <TextComponent words='Email address' className="w-1/4" />
                                        <div >&emsp;</div>
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
                                        <TextComponent words='Contact no.' className="w-1/4" />
                                        <div >&emsp;</div>
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
                                        <TextComponent words='Street address' className="w-1/4" />
                                        <div >&emsp;</div>
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
                                        <TextComponent words='Barangay' className="w-1/4" />
                                        <div >&emsp;</div>
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
                                        <TextComponent words='City/Municipality' className="w-1/4" />
                                        <div >&emsp;</div>
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
                                        <TextComponent words='Postal code' className="w-1/4" />
                                        <div >&emsp;</div>
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