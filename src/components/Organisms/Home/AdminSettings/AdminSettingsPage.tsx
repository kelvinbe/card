import { Box, IconButton, useToast } from "@chakra-ui/react"
import OperationalHeader from "../../OperationalHeader/OperationalHeader"
import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import TextComponent from "@/components/Atoms/Text/Text"
import { Input } from "@/components/ui/input"
import { feeTypeData, transactionTypeData } from "@/mock/dropdownData"
import { Button } from "@/components/ui/button"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import AdminCreateUserForm from "@/components/Molecules/Home/AdminSettings/AdminCreateUserForm"
import UserManagementSection from "./UserManagementSection/UserManagementSection"
import { useCookies } from "react-cookie"
import { SETTINGS } from "../../../../../settings"
import { useTheme } from "@/context/ThemeContext/ThemeContext"

export const AdminSettingsPage = () => {
    const passwordFormRef = useRef()
    const configurationsFormRef = useRef()
    const toast = useToast()
    const typePassword = 'password'
    const [recentPasswordInputType, setRecentPasswordInputType] = useState(typePassword)
    const [newPasswordInputType, setNewPasswordInputType] = useState(typePassword)
    const [confirmNewPasswordInputType, setConfirmNewPasswordInputType] = useState(typePassword)
    const [cookies, removeCookie] = useCookies([SETTINGS.tokenCookieName]);
    
    const { theme, setTheme } = useTheme()

    const passwordFormSchema = z.object({
        recentPassword: z.string().min(1, {
            message: "Field cannot be empty",
        }),
        newPassword: z.string().min(1, {
            message: "Field cannot be empty",
        }),
        confirmNewPassword: z.string().min(1, {
            message: "Field cannot be empty",
        })
    })

    const configurationsFormSchema = z.object({
        amount: z.string().min(1, {
            message: "Required",
        }),
        type: z.string().min(1, {
            message: "Required",
        }),
        transaction: z.string().min(1, {
            message: "Required",
        }),
        minLimit: z.string().min(1, {
            message: "Required",
        }),
        maxLimit: z.string().min(1, {
            message: "Required",
        })
    })

    type PasswordFormFields = z.infer<typeof passwordFormSchema>
    type ConfigurationsFormFields = z.infer<typeof configurationsFormSchema>

    const passwordForm = useForm<PasswordFormFields>({
        resolver: zodResolver(passwordFormSchema),
        defaultValues: {
            recentPassword: "",
            newPassword: "",
            confirmNewPassword: ""
        }
    })
    const configurationsForm = useForm<ConfigurationsFormFields>({
        resolver: zodResolver(configurationsFormSchema),
        defaultValues: {
            amount: "",
            type: "",
            transaction: "",
            minLimit: "",
            maxLimit: ""
        }
    })

    const handleRecentPasswordVisibility = () => {
        if (recentPasswordInputType === typePassword) {
            setRecentPasswordInputType('')
        } else {
            setRecentPasswordInputType(typePassword)
        }
    }

    const handleNewPasswordVisibility = () => {
        if (newPasswordInputType === typePassword) {
            setNewPasswordInputType('')
        } else {
            setNewPasswordInputType(typePassword)
        }
    }

    const handleConfirmNewPasswordVisibility = () => {
        if (confirmNewPasswordInputType === typePassword) {
            setConfirmNewPasswordInputType('')
        } else {
            setConfirmNewPasswordInputType(typePassword)
        }
    }

    const handlePasswordFormSubmit = async (values: PasswordFormFields) => {
        toast(
            {
                position: 'top',
                title: JSON.stringify(values),
                status: 'info',
                duration: 3000,
                isClosable: true,
            }
        )
    }

    const handleConfigurationsFormSubmit = async (values: ConfigurationsFormFields) => {
        toast(
            {
                position: 'top',
                title: JSON.stringify(values),
                status: 'info',
                duration: 3000,
                isClosable: true,
            }
        )
    }

    const handleLogout = () => {
        console.log('i was clicked')
        removeCookie('userToken')
    }





    const changeTheme = () => {
        const root = window.document.documentElement
        root.classList.remove("dark", "light")
        root.classList.add(theme)
    }



    const switchTheme = () => {
        // const newTheme = theme === 'light' ? 'dark' : 'light'
        setTheme((prevTheme: string) => {
            console.log('prevTheme', theme)
           return (prevTheme === 'light' ? 'dark' : 'light')
        
        })
        changeTheme()
    }

    return (
        <Box>
            <OperationalHeader name="Admin settings" buttonTitle="Save changes" buttonFunction={() => configurationsFormRef.current.requestSubmit()} />
            <hr />
            <Box w='100%' style={{ boxShadow: '10 10' }} rounded={30} display={'flex'} justifyContent={'space-evenly'} p={15}>
                <Box w={'40%'}>
                    <Box
                        className="dark:bg-[#232323]"
                        style={{
                            backgroundImage: "url('../src/assets/Background doodle.png')",
                            height: '226px',
                            padding: '32px 24px 32px 24px',
                            borderRadius: '7px',
                            gap: '18px',
                            justifyContent: 'center',
                        }}
                    >

                        <Box mb={'24px'} display={'flex'} justifyContent={'space-between'}>
                            <Box
                                style={{
                                    height: '96px',
                                    width: '96px',
                                    backgroundColor: '#CB4E0B',
                                    display: 'flex',
                                    borderRadius: '50%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    boxShadow: '0px 4px 8px 0px #00000040'
                                }}
                            >
                                <p
                                    className="text-primary-foreground"
                                    style={{
                                        margin: '0',
                                        textAlign: 'center',
                                        color: 'white',
                                        fontStyle: 'karla',
                                        fontSize: '48px',
                                        fontWeight: '500',
                                        lineHeight: '24px'

                                    }}
                                >J</p>
                            </Box>

                            <Button size="icon" onClick={switchTheme}>
                                {theme === 'light' ? <Box width={'44px'} height={'44px'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                    <img src="../src/assets/Light theme.png" width={'44px'} height={'44px'} />
                                </Box>
                                    : <Box width={'44px'} height={'44px'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                    <img src="../src/assets/Dark theme.png" width={'44px'} height={'44px'} />
                                </Box>}

                            </Button>

                        </Box>
                        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                            <Box className='text-foreground'>
                                <p>John Cruz</p>
                                <p>johncruz@test.com</p>
                            </Box>
                            <Box>

                                <button
                                    style={{
                                        padding: '6px 16px 6px 16px',
                                        borderWidth: '1px',
                                        borderRadius: '4px',
                                        gap: '0'
                                    }}
                                    onClick={handleLogout}
                                    className='bg-background text-foreground px-[16px] py-[6px] border-solid border-[1px] border-[#DDDDDD] dark:border-[#696969] rounded-[4px]'
                                >Log out</button>
                            </Box>
                        </Box>
                    </Box>
                    <br />
                    <hr />
                    <br />
                    <Form {...passwordForm}>
                        <form ref={passwordFormRef} onSubmit={passwordForm.handleSubmit(handlePasswordFormSubmit)}>

                            <Box padding={2} style={{ marginBottom: '20px' }} className="bg-[#F8F8F8] dark:bg-[#232323]">
                                <TextComponent words='Change your password' />
                            </Box>
                            <FormField
                                control={passwordForm.control}
                                name="recentPassword"
                                render={({ field }) => (
                                    <Box w={'100%'} alignItems={'center'}>
                                        <FormItem >
                                            <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                                <FormControl>
                                                    <Input placeholder="Recent password" type={recentPasswordInputType} {...field} />
                                                </FormControl>
                                                <Box marginLeft={'30%'} position={'absolute'}>
                                                    <IconButton
                                                        variant={'none'}
                                                        onClick={handleRecentPasswordVisibility}
                                                        icon={recentPasswordInputType == typePassword ? <ViewOffIcon /> : <ViewIcon />}
                                                        aria-label={"View password on/off"} />
                                                </Box>
                                            </Box>
                                            <FormMessage />
                                        </FormItem>
                                    </Box>
                                )}
                            />
                            <Box className='text-[#0A4DA1] underline' mt={'4px'} mb={'20px'}>
                                <TextComponent words='Forgot password?' size={'15px'} />
                            </Box>

                            <FormField
                                control={passwordForm.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <Box style={{ marginBottom: '20px' }} w={'100%'}>
                                        <FormItem >
                                            <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                                <FormControl>
                                                    <Input placeholder="New password" type={newPasswordInputType} {...field} />
                                                </FormControl>
                                                <Box marginLeft={'30%'} position={'absolute'}>
                                                    <IconButton
                                                        variant={'none'}
                                                        onClick={handleNewPasswordVisibility}
                                                        icon={newPasswordInputType == typePassword ? <ViewOffIcon /> : <ViewIcon />}
                                                        aria-label={"View password on/off"} />
                                                </Box>
                                            </Box>
                                            <FormMessage />
                                        </FormItem>
                                    </Box>
                                )}
                            />
                            <FormField
                                control={passwordForm.control}
                                name="confirmNewPassword"
                                render={({ field }) => (
                                    <Box style={{ marginBottom: '20px' }} w={'100%'}>
                                        <FormItem >
                                            <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                                <FormControl>
                                                    <Input placeholder="Confirm password" type={confirmNewPasswordInputType} {...field} />
                                                </FormControl>
                                                <Box marginLeft={'30%'} position={'absolute'}>
                                                    <IconButton
                                                        variant={'none'}
                                                        onClick={handleConfirmNewPasswordVisibility}
                                                        icon={confirmNewPasswordInputType == typePassword ? <ViewOffIcon /> : <ViewIcon />}
                                                        aria-label={"View password on/off"} />
                                                </Box>
                                            </Box>
                                            <FormMessage />
                                        </FormItem>
                                    </Box>
                                )}
                            />
                            <Button
                                className={`px-[16px] py-[6px] text-center inline-flex items-center rounded-3xl`}
                            >Save</Button>
                        </form>
                    </Form>

                </Box>
                <Box w={'40%'}>
                    <Form {...configurationsForm}>
                        <form ref={configurationsFormRef} onSubmit={configurationsForm.handleSubmit(handleConfigurationsFormSubmit)}>
                            <Box padding={2} style={{ marginBottom: '20px' }} className="bg-[#F8F8F8] dark:bg-[#232323]">
                                <TextComponent words='Configurations' />
                            </Box>
                            <Box padding={2} mb={'20px'} display={'flex'} justifyContent={'space-between'}>
                                <TextComponent words='Convinience fee' color='#A1A1A1' />
                                <TextComponent words='Need help?' />
                            </Box>
                            <FormField
                                control={configurationsForm.control}
                                name="amount"
                                render={({ field }) => (
                                    <Box style={{ marginBottom: '20px' }} display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
                                        <TextComponent words='Amount' className="w-1/4" mr="16px" />
                                        <FormItem className="w-3/4">
                                            <FormControl>
                                                <Input placeholder="Enter amount" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                            <TextComponent words="*Fees: 5, 10, 15, 20, 25, 28.50" size={'14px'} color={"#696969"} />
                                        </FormItem>
                                    </Box>
                                )}
                            />

                            <FormField
                                control={configurationsForm.control}
                                name="type"
                                render={({ field }) => (
                                    <Box style={{ marginBottom: '20px' }} display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
                                        <TextComponent words='Type' className="w-1/4" mr="16px" />
                                        <FormItem className="w-3/4">
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {feeTypeData.map(type => (
                                                        <SelectItem value={type.value}>{type.label}</SelectItem>
                                                    ))}

                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    </Box>
                                )}
                            />

                            <FormField
                                control={configurationsForm.control}
                                name="transaction"
                                render={({ field }) => (
                                    <Box style={{ marginBottom: '20px' }} display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
                                        <TextComponent words='Transaction' className="w-1/4" mr="16px" />
                                        <FormItem className="w-3/4">
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {transactionTypeData.map(type => (
                                                        <SelectItem value={type.value}>{type.label}</SelectItem>
                                                    ))}

                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    </Box>
                                )}
                            />

                            <Box padding={2}>
                                <TextComponent words='Transaction limit' color='#A1A1A1' />
                            </Box>
                            <FormField
                                control={configurationsForm.control}
                                name="minLimit"
                                render={({ field }) => (
                                    <Box style={{ marginBottom: '20px' }} display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
                                        <TextComponent words='Min limit' className="w-1/4" mr="16px" />
                                        <FormItem className="w-3/4">
                                            <FormControl>
                                                <Input placeholder="Enter minimum limit" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                            <TextComponent words="*Between 100-10,000 pesos" size={'14px'} color={"#696969"} />
                                        </FormItem>
                                    </Box>
                                )}
                            />
                            <FormField
                                control={configurationsForm.control}
                                name="maxLimit"
                                render={({ field }) => (
                                    <Box style={{ marginBottom: '20px' }} display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
                                        <TextComponent words='Max limit' className="w-1/4 form-input-label" size={'16px'} mr="16px" />
                                        <FormItem className="w-3/4">
                                            <FormControl>
                                                <Input placeholder="Enter maximum limit" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                            <TextComponent words="*Between 100-10,000 pesos" size={'14px'} color={"#696969"} />
                                        </FormItem>

                                    </Box>
                                )}
                            />
                        </form>
                    </Form>
               
                </Box>
                
            </Box>
        </Box >
    )
}