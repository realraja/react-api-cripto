import { Alert, AlertIcon } from '@chakra-ui/react'
import React from 'react'

const ErrorComponent = ({message}) => {
  return (
    <Alert w={'container.lg'} status='error' position={'fixed'} top={'24'} left={'50%'} transform={"translateX(-50%)" }>
      <AlertIcon />
      {message}
    </Alert>
  )
}

export default ErrorComponent
