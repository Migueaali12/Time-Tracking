import { Button, useToast } from '@chakra-ui/react'

interface UserToastProps {
  buttonText: string
  fetchFunction: () => Promise<void>
  successTitle: string
  successMessage: string
  errorTitle: string
  errorMessage: string
  loadingTitle: string
  loadingMessage: string
  
}
export function useUserToast({
  buttonText,
  fetchFunction,
  successTitle,
  successMessage,
  errorTitle,
  errorMessage,
  loadingTitle,
  loadingMessage,
}: UserToastProps) {
  const toast = useToast()
  return (
    <Button
      onClick={() => {
        toast.promise(fetchFunction(), {
          success: { title: successTitle, description: successMessage },
          error: { title: errorTitle, description: errorMessage },
          loading: { title: loadingTitle, description: loadingMessage },
        })
      }}
    >
      {buttonText}
    </Button>
  )
}
