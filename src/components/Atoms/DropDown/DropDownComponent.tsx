"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { IDropDown } from "types"
import { useNavigate } from "react-router-dom";

export function DropDownComponent(props: IDropDown) {
  const {data, textColor, popOverWidth, buttonWidth, borderRadius} = props

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(data[0].label)
  const navigate = useNavigate();


  console.log('textColor', textColor)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          style={{color: `${textColor}`}}
          aria-expanded={open}
          className={`w-[${buttonWidth}px]  rounded-${borderRadius} h-[30px] justify-between bg-transparent`}
        >   
        {value
            ? data?.find((framework) => framework?.value === value)?.label
            : data[0].label}
          <ChevronDown className={`h-4 w-4 shrink-0 opacity-50`} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={`w-[${popOverWidth}px] p-0`}>
      <Command>
          <CommandList>
            <CommandEmpty>No Data found.</CommandEmpty>
            <CommandGroup>
              {data.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    if(currentValue === 'Available'){
                    navigate('/availableTerminals')
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)

                    }else if(currentValue === 'Assigned'){
              navigate('/Terminals')
               setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)      
                    }
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
