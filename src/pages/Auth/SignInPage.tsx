import SignInHeader from '@/components/Molecules/Auth/SignInHeader'
import { Box, Flex } from '@chakra-ui/react'
import BackImage from '../../assets/BackgroundImg.png'
import SignInSection from '@/components/Molecules/Auth/SignInSection'
import { SignInForm } from '@/components/Molecules/Auth/SignInForm'
import { Divider } from '@chakra-ui/react'
import Footer from '@/components/Molecules/Auth/Footer'

const SignInPage = () => {
  const img = `linear-gradient(rgba(10, 77, 161, 0.5), rgba(10, 77, 161, 0.5)), url(${BackImage})`;

    return (
        <Box
            style={{
                backgroundImage: img,
                width: '100%',
                height: '100vh',
                justifyContent: 'center',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
            flexDirection={'column'}
        >
            <SignInHeader />
            <Flex flexDirection={'row'} h={'77%'} w={'100%'} justifyContent={'center'} alignItems={'center'}>
            <SignInSection />
            <Divider colorScheme='red'  style={{backgroundColor: 'white', margin: 20, width: 1}}  height={400}  />
            <SignInForm />
            </Flex>
            <Footer />
        </Box>
    );

}

export default SignInPage
