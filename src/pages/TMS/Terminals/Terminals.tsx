import React from 'react'
import { CompactTable } from '@table-library/react-table-library/compact';
import { Box } from '@chakra-ui/react';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';

import TmsTable from '@/components/Organisms/Home/Terminals/TmsTable';
import {TerminalsData} from '../../../mock/terminal.ts'
import { columns } from '@/components/Organisms/Home/Terminals/Columns.tsx';
import OperationalHeader from '@/components/Organisms/OperationalHeader/OperationalHeader.tsx';


const Terminals = () => {

  return (
        <Box className='px-20 py-3'>
          <Box className='mb-6'>
          </Box>
          <TmsTable data={TerminalsData} columns={columns}  />
        </Box>
)
}

export default Terminals