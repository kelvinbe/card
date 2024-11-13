import TextComponent from '@/components/Atoms/Text/Text';
import { Progress } from '@/components/ui/progress';
import { Box } from '@chakra-ui/react'
import React, { useState } from 'react'



interface IDashboard{
    headerName: string;
    headerName2: string

}


const DashboardMiniHeader = (props: IDashboard) => {
    const [active, setActive] = useState(false)
    const [progress, setProgress] = useState(40)
    const [statusValue, setStatusValue] = useState('Active')

    const {headerName, headerName2} = props

    const handleActive = (buttonId: number) => {
        console.log('buttonId', buttonId)
        if(buttonId === 1 && active === false){
            setProgress(40)
            setActive(true)
        } else if(buttonId === 2 && active === false){
            setProgress(80)
            setStatusValue('Assigned')
            setActive(true)
        }else{
            setActive(false)
            setProgress(40)
            setStatusValue('Active')
        }

    }

  return (
    <Box className='w-full'>
    <Box className='bg-[#F6F6F7] w-full h-[42px] flex justify-center rounded items-center'>
        <Box className='flex'>
          <Box onClick={() => handleActive(1)} className={`${!active ? 'w-[121px] h-[30px] bg-[#fff]  rounded-md shadow-md' : ''}  flex mr-[40px] justify-center items-center`}>{headerName}</Box>  
          <Box onClick={() => handleActive(2)} className={`${active ? 'w-[121px] h-[30px] bg-[#fff]  rounded-md shadow-md' : ''}  flex mr-[40px] justify-center items-center`}>{headerName2}</Box>  
        </Box>
    </Box>
    <Box className='pt-6'>
        <Progress value={progress}   className='w-[100%]'  />
        <Box className='flex justify-between'>
          <TextComponent words={`${statusValue === 'Active' ? 'Active' : 'Assigned' } 40%`} />
          <TextComponent words={`${statusValue === 'Active' ? 'InActive': 'Available'} 90%`} />
        </Box>
      </Box>
    </Box>
  )
}

export default DashboardMiniHeader