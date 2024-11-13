import { Box } from '@chakra-ui/react';
import React from 'react'
import { useRouteError } from "react-router-dom";


const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);

  return (
    <Box height={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
    <h1>Oops!</h1>
    <p>Sorry, an unexpected error has occurred.</p>
    <p>
      <i>{error.statusText || error.message}</i>
    </p>
  </Box>
  )
}

export default ErrorPage