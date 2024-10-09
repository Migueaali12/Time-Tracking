import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react'

export function UnauthorizedView() {
  return (
    <Alert status="error" h={'20'} fontSize={'xl'}>
      <AlertIcon />
      <AlertTitle>Acceso no autorizado!</AlertTitle>
      <AlertDescription>Para acceder a esta vista inicia sesión primero</AlertDescription>
    </Alert>
  )
}
