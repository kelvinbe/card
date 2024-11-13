import React, {useContext} from 'react'
import { CompactTable } from '@table-library/react-table-library/compact';
import { Box } from '@chakra-ui/react';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';

import TmsTable from '@/components/Organisms/Home/Terminals/TmsTable';
import {TerminalsData} from '../../../../mock/terminal.ts'
import { columns } from '@/components/Organisms/Home/Terminals/AvailableTerminals/Columns.tsx';
import OperationalHeader from '@/components/Organisms/OperationalHeader/OperationalHeader.tsx';
import AvailableTerminalsTable from '@/components/Organisms/Home/Terminals/AvailableTerminals/AvailableTerminals.tsx';
import { TerminalContext } from '@/context/TerminalsContext/TerminalContext.tsx';

const AvailableTerminals = () => {
  const {allTerminals} = useContext(TerminalContext)

  return (
        <Box className='px-20 py-3'>
          <Box className='mb-6'>
          </Box>
          <AvailableTerminalsTable data={allTerminals} columns={columns}  />
        </Box>
)
}

export default AvailableTerminals