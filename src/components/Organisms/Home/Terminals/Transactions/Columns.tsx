import React from 'react'
import { ColumnDef } from "@tanstack/react-table"
import {ITerminal} from '../../../../../types'
import StatusBadge from '@/components/Atoms/StatusBadge/StatusBadge.tsx';
import { Link } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { formatDate, formatDateForDay } from '@/utils/utils';






export const columns: ColumnDef<ITerminal>[] = [
    {
        header: 'TRANSACTION ID',
        accessorKey: 'id',
        filterFn: 'equalsString',
        enableGlobalFilter: true
    },

    {
        header: 'DATE',
        accessorKey: 'date',
        cell: ({row}) => {
            const date =  formatDateForDay(new Date())
            console.log('date', date)
            return <Box>{date}</Box>
        },
        filterFn: 'includesStringSensitive',
        enableGlobalFilter: true

    },
    {
        header: 'AMOUNT',
        accessorKey: 'amount',
        filterFn: 'includesStringSensitive', 
        enableGlobalFilter: true

    },
    {
        header: 'FEE',
        accessorKey: 'fee',
        filterFn: 'includesStringSensitive', 
        enableGlobalFilter: true


    },
    {
        header: 'PAYMENT TYPE',
        accessorKey: 'payment_type',
        filterFn: 'includesStringSensitive',
        enableGlobalFilter: true,
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
        enableGlobalFilter: true,
    },
    {
        header: 'DETAILS',
        accessorKey: 'details',
        filterFn: 'includesStringSensitive',
        enableGlobalFilter: true,
    },
    
]