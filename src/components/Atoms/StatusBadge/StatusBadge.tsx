import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { IStatusBadge, Status } from 'types'
import TextComponent from '../Text/Text'




const checkStatusBackground = (status?: Status) => {

  switch (status) {
    case 'Active':
      return '#0DAB0D1A'
    case 'Offline':
      return '#0D0B651A'
    case 'Inactive':
      return '#0D0B651A'
    case 'Refunded':
      return '#0D0B651A'
    case 'Approved':
      return '#0DAB0D1A'
    default:
      break;
  }

}


const checkStatusText = (status?: Status) => {

  switch (status) {
    case 'Active':
      return '#0D680D'
    case 'Offline':
      return '#0D0B65'
    case 'Inactive':
      return '#0D0B65'
    case 'Refunded':
      return '#0D0B65'
    case 'Approved':
      return '#0D680D'
    default:
      break;
  }


}




const StatusBadge = (props: IStatusBadge) => {

const {status, bgColor} = props

  return (
    <Box className={`w-[73px] h-[24px] flex justify-center items-center rounded-sm`} bgColor={checkStatusBackground(status)} >
        <TextComponent words={status} color={checkStatusText(status)} size={'xs'}  />
    </Box>
  )
}

export default StatusBadge