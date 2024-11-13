import { ReactNode } from 'react'
import { Button } from "@/components/ui/button"
import { Box } from '@chakra-ui/react';
import { Loader2 } from 'lucide-react';



interface IButtonComponent{
    icon: ReactNode;
    title: string;
    bgColor: string;
    textColor: string;
    onClick: () => void;
    buttonLoader?: ReactNode;
    isLoading?: boolean
}


const ButtonComponent = (props: IButtonComponent) => {

    const {icon, title, bgColor, textColor, onClick, isLoading} = props
    // <Button disabled={form.formState.isSubmitting} style={{width: '100%', height: '30px', borderRadius: '20px', backgroundColor: '#0A4DA1', marginTop: '10px'}} size={'lg'} type="submit">{form.formState.isSubmitting ? <Loader2 color="#70B3E2" className="animate-spin" /> : 'Sign in'}</Button>


  return (

    <div>
        <Button disabled={isLoading}  onClick={onClick} style={{backgroundColor: `${bgColor}`, color: `${textColor}`}} className={`h-8  min-w-44`} variant={'default'}>
            <Box>
            {icon}
            </Box>
            
        {isLoading ? <Loader2 color="#70B3E2" className="animate-spin" /> : `${title}`}

        </Button>
    </div>
  )
}

export default ButtonComponent