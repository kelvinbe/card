import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Box } from "@chakra-ui/react";
import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils";
import { ColumnDef, ColumnFiltersState, FilterFn, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import OperationalHeader from "../../OperationalHeader/OperationalHeader";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import useOperationsStore from "@/store/useOperationsStore";
import useColumnValueStore from "@/store/useColumnValueStore";
import FilterByComponent from "@/components/Molecules/Home/FilterByComponent/FilterByComponent";
import ButtonComponent from "@/components/Atoms/Button/ButtonComponent";
import { locationData, merchantsLocationData, merchantStatusData, StatusData } from "@/mock/dropdownData";

interface MerchantsTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
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

export function MerchantsTable<TData, TValue>(
    { columns, data }: MerchantsTableProps<TData, TValue>
) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [globalFilter, setGlobalFilter] = useState('')

    const navigate = useNavigate()

    const { selectedOperation } = useOperationsStore()
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: 'fuzzy',
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            columnFilters,
            globalFilter
        },
        filterFns: {
            fuzzy: fuzzyFilter
        }
    })

    const setSelectedOperation = useOperationsStore(state => state.setSelectedOperation);
    const setColumnValue = useColumnValueStore(state => state.setColumnValue);
    const { columnValue } = useColumnValueStore();

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
            <OperationalHeader filterData={filterData} buttonIcon={<Plus className="mr-2 h-4 w-4" />} buttonFunction={() => navigate('/createMerchant')} search filter
                buttonTitle="Create Merchant" searchTerm={globalFilter} onSearch={setGlobalFilter} table={table} name="Merchants" />
            {selectedOperation && <Box m={5} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <Box display={'flex'}>
                    <FilterByComponent columnValues='location' clear={columnValue} table={table} variant='location' borderRadius='full' buttonWidth='150' chevronColor='#000' textColor='#fff' data={merchantsLocationData} popOverWidth='100' />
                    {selectedOperation === 'Status' && <FilterByComponent clear={columnValue} table={table} variant='status' borderRadius='full' buttonWidth='150' chevronColor='#000' textColor='#fff' data={merchantStatusData} popOverWidth='100' />}
                </Box>
                <ButtonComponent onClick={clearFilters} icon={<X size={15} className="mt-1" color="#000" />} textColor='#000' title='Clear Filter' bgColor='transparent' />
            </Box>
            }
            <Box className='rounded-md border'>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className='text-center'>
                                    No merchants available
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <Box display={'flex'} className='justify-end'>
                    <Button
                        variant="outline"
                        size="sm"
                        style={{ margin: 10 }}
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        style={{ margin: 10 }}
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