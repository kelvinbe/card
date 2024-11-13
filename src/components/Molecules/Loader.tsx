import React, { useEffect } from 'react'
import { Image, Flex, Box, useToast } from '@chakra-ui/react'
import KayaImage from '../../assets/KAYA Icon Circle Bubble.png'
import { Progress } from "@/components/ui/progress"
import { redirect, useNavigate } from "react-router-dom";




const Loader = () => {
  const [progress, setProgress] = React.useState(13)
  const navigate = useNavigate()
  const toast = useToast()

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProg) => {
        const updatedProg = prevProg + 1;
        if (updatedProg === 100) {
          clearInterval(timer);
          navigate('/signin');
        }
        return updatedProg;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [navigate]);





  return (
    <Flex flexDirection={'column'} width={'100%'} height={'100%'} justifyContent={'center'} alignItems={'center'}>

        <Image width={'150px'}  src={KayaImage} alt='kaya-image' />
        <Progress  value={progress}  className='w-[30%]'  />

    </Flex>
  )
}

export default Loader