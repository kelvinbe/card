import React, {useState} from 'react'

import {
    Calculator,
    Calendar,
    CreditCard,
    Settings,
    Smile,
    User,
  } from "lucide-react"

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"

  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { ISearchBarDefacto } from 'types'
import { Input } from '@/components/ui/input'



const SearchBarDefacto = ({onSearch, searchTerm, handleSearch}) => {

    // const {data, searchFunc, table} = props

    console.log('searchTerm', searchTerm)

  const handleChange = (event) => {
    onSearch(event.target.value);
    // handleSearch(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      value={searchTerm ?? ''}
      onChange={handleChange}
    />
  );


}

export default SearchBarDefacto