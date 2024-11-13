import React from 'react'
import { ColumnDef } from "@tanstack/react-table"
import {ITerminal} from '../../../../../types'
import StatusBadge from '@/components/Atoms/StatusBadge/StatusBadge.tsx';
import { Link } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { formatDate, formatDateForDay } from '@/utils/utils';




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
        header: 'OPERATOR ID',
        accessorKey: 'id',
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
        header: 'ACTIONS',
        accessorKey: 'operators',
        cell: ({row}) => {
            const operators = row.getValue('operators')
            const id = row.getValue('id')
            return <Link to={`/operator/details/${id}`} className='text-[#0A4DA1] underline' >{operators}</Link>
        },
        filterFn: 'includesStringSensitive',
        enableGlobalFilter: true,
    }
    
]