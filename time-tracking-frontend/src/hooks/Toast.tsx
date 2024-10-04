import { useToast } from '@chakra-ui/react'

// interface ItoastProps {
//   title: string
//   description: string
//   status: 'success' | 'error' | 'info' | 'warning' | 'loading' | undefined
// }

export function UserToast() {
  const toast = useToast()
    toast({
      title: 'Account created.',
      description: "We've created your account for you.",
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
  }
