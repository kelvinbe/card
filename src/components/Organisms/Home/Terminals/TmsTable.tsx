import React, { useEffect, useState } from 'react'

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  FilterFn,
  SortingFn,
  getSortedRowModel,
  sortingFns,
  SortingState,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Box } from '@chakra-ui/react'
import { Button } from '@/components/ui/button'
import OperationalHeader from '../../OperationalHeader/OperationalHeader'
import FilterByComponent from '@/components/Molecules/Home/FilterByComponent/FilterByComponent'
import { locationData, StatusData } from '@/mock/dropdownData'
import useOperationsStore from '@/store/useOperationsStore'
import {
  RankingInfo,
  rankItem,
  compareItems,
} from '@tanstack/match-sorter-utils'
import ButtonComponent from '@/components/Atoms/Button/ButtonComponent'
import { Plus, X } from 'lucide-react'
import useColumnValueStore from '@/store/useColumnValueStore'
import { useNavigate } from 'react-router-dom'


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

function customFilter(filter, row) {
  const searchTerm = filter.value.trim();
  if (searchTerm.startsWith('"') && searchTerm.endsWith('"')) {
    // Exact match search if the search term is enclosed in quotes
    const exactSearchTerm = searchTerm.slice(1, -1);
    return row.toString() === exactSearchTerm;
  } else {
    // Regular search if no quotes are used
    return row.toString().toLowerCase().includes(searchTerm.toLowerCase());
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank,
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

declare module '@tanstack/react-table' {
  //add fuzzy filter to the filterFns
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

const fuzzySort = (rowA, rowB, columnId) => {
  let dir = 0

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]!,
      rowB.columnFiltersMeta[columnId]!
    )
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir
}




function TmsTable<TData, TValue>({columns, data}:DataTableProps<TData, TValue>) {

  const [globalFilter, setGlobalFilter] = React.useState('')
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [clear, setClear] = useState(false)
  const [reloadKey, setReloadKey] = useState(Date.now());
  const [sorting, setSorting] = useState<SortingState>([])

  const navigate = useNavigate()

  const {selectedOperation} = useOperationsStore()
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: 'fuzzy',
    state: {
      columnFilters,
      sorting,
      globalFilter
    },
    filterFns: {
      fuzzy: fuzzyFilter,
    },

  })
  const setSelectedOperation = useOperationsStore(state => state.setSelectedOperation);
  const setColumnValue = useColumnValueStore(state => state.setColumnValue);
  const {columnValue} = useColumnValueStore();



  console.log('selectedOperation', selectedOperation)

  useEffect(() => {

  }, [])

  const clearFilters = () => {
    setSelectedOperation(null)
    setColumnValue(true)
    window.location.reload();
  }
  const filterData = [
    {
      value: "Location",
      label: "location",
    },
    {
      value: "Status",
      label: "status",
    },
  ]

  return (
    <Box>
          <OperationalHeader filterData={filterData} buttonIcon={<Plus className="mr-2 h-4 w-4" />} buttonFunction={() => navigate('/home/createTerminal')} dropDown search filter buttonTitle='Create Terminal' searchTerm={globalFilter} onSearch={setGlobalFilter}   table={table} name='Terminals' />  
        {selectedOperation &&  <Box m={5} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
          <Box display={'flex'}>
          <FilterByComponent columnValues='location' clear={columnValue} table={table} variant='location' borderRadius='full'  buttonWidth='150' chevronColor='#000' textColor='#fff' data={locationData} popOverWidth='100' /> 
         {selectedOperation === 'Status' && <FilterByComponent clear={columnValue} table={table} variant='status' borderRadius='full'  buttonWidth='150' chevronColor='#000' textColor='#fff' data={StatusData} popOverWidth='100' /> }
         </Box>
         <ButtonComponent onClick={clearFilters} icon={<X size={15} className="mt-1" color="#000" />} textColor='#000' title='Clear Filter' bgColor='transparent' />
          </Box>
          }
    <Box
    className='rounded-md border'>
      <Table>
        <TableHeader>
            {table.getHeaderGroups().map(headerGroup => {
              return (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => {
                      return (
                        <TableHead key={header.id}>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      )
                  })}
                </TableRow>
              )
            })}
        </TableHeader>
        <TableBody>
          {table.getRowModel()?.rows?.length > 0  ? (
            table.getRowModel()?.rows?.map(row => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                ))}
              </TableRow>
            ))
          ):(
            <TableRow>
              <TableCell className='flex justify-center'>
              There is no Terminals Data Available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        
      </Table>
      <Box display={'flex'} className='justify-end'>

        <Button
          variant="outline"
          size="sm"
          style={{margin: 10}}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          style={{margin: 10}}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
        </Box>
    </Box>
    </Box>
  )
}


export default TmsTable