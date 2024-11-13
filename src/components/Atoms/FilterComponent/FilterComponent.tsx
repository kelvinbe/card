import React from 'react'

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut
  } from "@/components/ui/command"
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  import { IDropDown, IFilterComponent } from "types"
import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown, ChevronDown, ListFilter  } from "lucide-react"
import { cn } from "@/lib/utils"
import useOperationsStore from '@/store/useOperationsStore'
import { Checkbox } from "@/components/ui/checkbox"




const sortingData = [
  {
    value: 'Alphabetically(A-Z)',
    label: 'Alphabetically(A-Z)'
  },
  
]


const FilterComponent = (props: IFilterComponent) => {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const [filterValue, setFilterValue] = React.useState("");
    const [sortValue, setSortValue] = React.useState("");
    const {table, filterData} = props
  const setSelectedOperation = useOperationsStore(state => state.setSelectedOperation);
  const handleSelect  = (value: string) => {
    console.log('ValueINSELECT', value)
    const column = table.getColumn(value)
    console.log('columnINHandleSelect', column)
   return column?.toggleSorting(column.getIsSorted() === "asc")

  }

  const handleFilterSelect = (value: string) => {
    setSortValue('');
    setFilterValue(value);
    setSelectedOperation(value);
    setOpen(false);
};

const handleSortSelect = (value: string) => {
    setFilterValue('');
    setSortValue(value);
    console.log('value', value)
    handleSelect('name');
    setOpen(false);
};

function truncate(str, n){
  return (str.length > n) ? str.slice(0, n-1) + '...' : '';
}
    
  return (
 
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[100px] h-9 justify-between"
          >
          {filterValue || sortValue
                       ? `${filterValue || ''} ${truncate(sortValue, 5) || ''}`
                        : "Filter"}

            <ListFilter />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup heading='Filter by'>
                {filterData?.map((data) => (
                  <CommandItem
                    key={data.value}
                    value={data.value}
                    onSelect={() => handleFilterSelect(data.value)}
                  
                  >
                    <Checkbox
                      checked={data.value === filterValue}
                      className={cn(
                        "mr-2 h-4 w-4",
                      )}
                    />
                    {data.label}
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator/>
              <CommandGroup heading="Sort by">
              {sortingData.map((data) => (
                  <CommandItem
                    key={data.value}
                    value={data.value}
                    onSelect={() => handleSortSelect(data.value)}
                  >
                    <Checkbox
                      checked={data.value === value}
                      className={cn(
                        "mr-2 h-4 w-4",
                      )}
                    />
                    {data.label}
                  </CommandItem>
                ))}
        
        </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
  )
}

export default FilterComponent