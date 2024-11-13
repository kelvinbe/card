import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'



interface IDropDown{
  data: string[],
  selected: string,
  onSelect: (value: string) => void
}

const DropDown = (props: IDropDown) => {

  const {data, selected, onSelect} = props

  return (
    <DropdownMenu>
  <DropdownMenuTrigger>
  <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[190px] h-9 justify-between items-center"
          >
          
    {selected}
            <ChevronDown />
          </Button>

  </DropdownMenuTrigger>
  <DropdownMenuContent className='flex w-[300px] p-2 flex-wrap'>
    {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
    <DropdownMenuSeparator />
   {
    data.map((month) => {
      return <DropdownMenuItem key={month}  onClick={() => onSelect(month)} className='w-fit  m-1 bg-white rounded-full border-2 border-black'>{month}</DropdownMenuItem>
    })

   } 

  </DropdownMenuContent>
</DropdownMenu>
  )
}

export default DropDown