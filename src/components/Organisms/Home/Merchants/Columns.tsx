import StatusBadge from "@/components/Atoms/StatusBadge/StatusBadge";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { IMerchant } from "types";

export const columns: ColumnDef<IMerchant>[] = [
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
        header: 'MERCHANT ID',
        accessorKey: 'merchantId',
        filterFn: 'includesStringSensitive',
        enableGlobalFilter: true
    },
    {
        header: 'LOCATION',
        accessorKey: 'city',
        filterFn: 'includesStringSensitive',
        enableGlobalFilter: true
    },
    {
        header: 'DEVICES',
        accessorKey: 'devices',
        filterFn: 'includesStringSensitive',
        enableGlobalFilter: true
    },
    {
        header: 'ACTIONS',
        accessorKey: 'viewDetails',
        cell: ({row}) => {
            const viewDetails = row.getValue('viewDetails')
            const merchantId = row.getValue('merchantId')
            return <Link to={`/merchant/details/${merchantId}`} className='text-[#0A4DA1] underline' >{viewDetails}</Link>
        },
        filterFn: 'includesStringSensitive',
        enableGlobalFilter: true
    }
]