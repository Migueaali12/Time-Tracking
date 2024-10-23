import { ToastId, UseToastOptions } from '@chakra-ui/react'

type ToastProps = {
  toast: (options?: UseToastOptions) => ToastId
  title: string
  description?: string
  status: 'info' | 'warning' | 'error' | 'success'
}

export function showToast({ toast, title, description, status }: ToastProps) {
  if (description) {
    toast({
      title: title,
      description: description,
      status: status,
      duration: 5000,
      isClosable: true,
      position: 'top',
    })
  } else {
    toast({
      title: title,
      status: status,
      duration: 5000,
      isClosable: true,
      position: 'top',
    })
  }
}
