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
            const date =  formatDateForDay(new Date())
            console.log('date', date)
            return <Box>{date}</Box>
        },
        filterFn: 'includesStringSensitive',
        enableGlobalFilter: true,
    },
    
]