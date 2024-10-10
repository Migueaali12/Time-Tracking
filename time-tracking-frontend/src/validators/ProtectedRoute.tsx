import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Alert, AlertIcon } from '@chakra-ui/react'
import { getAuthToken } from '../functions/Token'

interface ProtectedRouteProps {
  children: React.ReactNode
  roles: Array<'USER' | 'ADMIN'>
}

export function ProtectedRoute({ children, roles }: ProtectedRouteProps) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuthorization = async () => {
      const encryptedToken = localStorage.getItem('authToken')

      if (encryptedToken) {
        try {

          const res = await fetch(`http://127.0.0.1:8000/api/user/validate-token`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${getAuthToken()}`,
            },
          })

          const data = await res.json()

          if (data.status === 200) {
            setIsAuthorized(roles.includes(data.user.role))
          } else {
            setIsAuthorized(false)
          }
        } catch (error) {
          console.error('Error desencriptando el token:', error)
          setIsAuthorized(false)
        }
      } else {
        setIsAuthorized(false)
      }

      setIsLoading(false)
    }

    checkAuthorization()
  }, [roles]) 

  if (isLoading) {
    return (
        <Alert status='success' h={'20'} fontSize={'xl'}>
        <AlertIcon />
        Cargando...
      </Alert>
    )
  }

  if (isAuthorized) {
    return <>{children}</> 
  } else {
    return <Navigate to="/unauthorized" /> 
  }
}
