import { Alert, AlertIcon } from '@chakra-ui/react'
import { useState } from 'react'

export interface UserAlertProps {
  hidden: boolean
  type: 'success' | 'error' | undefined
  content: string
}

export function useAlert() {
  const [alert, setAlert] = useState<UserAlertProps>({ hidden: true, type: undefined, content: '' })

  const AlertComponent = (
    <Alert status={alert.type} hidden={alert.hidden} rounded={'md'} marginTop={5}>
      <AlertIcon />
      {alert.content}
    </Alert>
  )

  return { setAlert, AlertComponent }
}
