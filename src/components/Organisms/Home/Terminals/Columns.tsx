import React from 'react'
import { ColumnDef } from "@tanstack/react-table"
import {ITerminal} from '../../../../../types'
import StatusBadge from '@/components/Atoms/StatusBadge/StatusBadge.tsx';
import { Link } from 'react-router-dom';
import { Box } from '@chakra-ui/react';



export const columns: ColumnDef<ITerminal>[] = [
    {
        header: '#',
        accessorKey: 'id',
        filterFn: 'equalsString',
        enableGlobalFilter: true
    },
    {
        header: 'STATUS',
        accessorKey: 'status',
        cell: ({row}) => {
            const status = row.getValue('status')
            console.log('status', status)
            return <StatusBadge status={status} />
        },
        filterFn: 'includesStringSensitive',
        enableGlobalFilter: true

    },
    {
        header: 'NAME',
        accessorKey: 'name',
        filterFn: 'includesStringSensitive',
        enableGlobalFilter: true

    },
    {
        header: 'SERIAL NO',
        accessorKey: 'serial_no',
        filterFn: 'includesStringSensitive', 
        enableGlobalFilter: true

    },
    {
        header: 'TERMINAL ID',
        accessorKey: 'terminal_id',
        filterFn: 'includesStringSensitive', 
        enableGlobalFilter: true


    },
    {
        header: 'MERCHANT',
        accessorKey: 'merchant',
        filterFn: 'includesStringSensitive',
        enableGlobalFilter: true


    },
    {
        header: 'LOCATION',
        accessorKey: 'location',
        filterFn: 'includesStringSensitive',
        enableGlobalFilter: true


    },
    {
        header: 'ACTIONS',
        accessorKey: 'transactions',
        cell: ({row}) => {
            const transaction = row.getValue('transactions')
            const id = row.getValue('id')
            return <Link to={`/transactions/${id}`} className='text-[#0A4DA1] underline' >{transaction}</Link>
        },
        filterFn: 'includesStringSensitive',
        enableGlobalFilter: true,
    },
    
]



export const AvailableTerminals: ColumnDef<ITerminal>[] = [
    {
        header: '#',
        accessorKey: 'id',
        filterFn: 'equalsString',
        enableGlobalFilter: true
    },

    {
        header: 'NAME',
        accessorKey: 'name',
        filterFn: 'includesStringSensitive',
        enableGlobalFilter: true

    },
    {
        header: 'SERIAL NO',
        accessorKey: 'serial_no',
        filterFn: 'includesStringSensitive', 
        enableGlobalFilter: true

    },
    {
        header: 'TERMINAL ID',
        accessorKey: 'terminal_id',
        filterFn: 'includesStringSensitive', 
        enableGlobalFilter: true


    },
    {
        header: 'DATE ADDED',
        accessorKey: 'date',
        cell: ({row}) => {
            const date = new Date()
            return <Box>{date}</Box>
        },
        filterFn: 'includesStringSensitive',
        enableGlobalFilter: true,
    },
    
]