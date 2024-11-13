"use client"

import * as React from "react"
import { Check, ChevronsUpDown, ChevronDown, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { IDropDown } from "types"
import { Box } from "@chakra-ui/react"
import TextComponent from "@/components/Atoms/Text/Text"
import useColumnValueStore from '@/store/useColumnValueStore'


const FilterByComponent = (props: IDropDown) => {
  const {data, textColor, chevronColor, popOverWidth, buttonWidth, borderRadius, variant, table, clear, columnValues } = props

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(data[0].label)

  const setColumnValue = useColumnValueStore(state => state.setColumnValue);
  const columnValue = useColumnValueStore();

  const handleSelect = (currentValue: string, columnValue: string) => {
    let newValue = currentValue === value? "" : currentValue;
    setValue(newValue);
    table.getColumn(columnValue)?.setFilterValue(newValue);
    setOpen(false);
  };



  return (
    <Box m={1}>
    <Popover open={open} onOpenChange={setOpen}>
      
      <PopoverTrigger asChild>
        
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`flex p-5  max-w-96 text-[#0A4DA1] rounded-${borderRadius} h-[30px] justify-between bg-transparent`}
        >   
        <Box className="flex justify-center">
          <Box className="flex justify-between mr-[15px]">
            <Box>
        <X size={15} className="mt-1" color="#000" />
        </Box>
            <TextComponent words={variant === 'location' ? "Location" : variant === 'merchant' ? 'Merchant' : 'Status'} color="#000" />|
            </Box>
        </Box>
        {value
            ? data?.find((framework) => framework?.value === value)?.label
            : data[0].label}
          <ChevronDown className={`text-${chevronColor} h-4 w-4 shrink-0 opacity-50`} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={`w-[400px] p-0`}>
      <Command>
          <CommandList>
            <CommandEmpty>No Data found.</CommandEmpty>
            <CommandGroup className="flex" heading='Filter by'>
              {data.map((framework) => {
                  console.log('framework', framework.value)
                  let valueColumn: string;
                  console.log('clear', clear)
                  if(clear === true){
                    valueColumn = ''
                    setColumnValue(null)
                  }
                if((framework.value === 'Active' && clear !== true) || (framework.value === 'Offline' && clear !== true)){
                  valueColumn = 'status'
                }else{
                  valueColumn = columnValues
                }
               return  <CommandItem
                  className="border-2	border-black flex w-max	rounded-full m-2"
                  key={framework.value}
                  value={(table.getColumn(valueColumn)?.getFilterValue() as string) ?? ""}
                  onSelect={() => handleSelect(framework.value, valueColumn)}
                >
                  {framework.label}
                </CommandItem>
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
</Box>
  )
}

export default FilterByComponent
