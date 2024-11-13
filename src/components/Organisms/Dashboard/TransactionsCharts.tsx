import TextComponent from '@/components/Atoms/Text/Text';
import { Box } from '@chakra-ui/react';
import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


interface ITransactionsCharts{
  data: {name: string,TransactionAmount: number,TransactionVolume: number,amt: number}[]
}


const TransactionsCharts = (props: ITransactionsCharts) => {

  const {data} = props

  return (
    <Box className='w-full h-[400px]'>
    <ResponsiveContainer width={'100%'} height={'100%'} >
    <LineChart
      width={800}
      height={300}
      data={data}
      margin={{top: 5,right: 30,left: 20,bottom: 5}}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="TransactionAmount" stroke="#8884d8" activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="TransactionVolume" stroke="#82ca9d" />
    </LineChart>
    </ResponsiveContainer>
    </Box>
  )
}

export default TransactionsCharts