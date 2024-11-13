import { Box } from '@chakra-ui/react'
import TextComponent from '../Text/Text';



interface IBadgeInfo {
  title: string;
  color: string;


}

const BadgeInfo = (props: IBadgeInfo) => {

  const {title, color} = props

  return (
    <Box className={`w-fit h-[29px] bg-[${color}] p-2 rounded-full justify-center`}>
      <Box className='mt-[-4px]'>
     <TextComponent words={title}  size={'14px'} weight='700' />
     </Box>
    </Box>
  )
}

export default BadgeInfo