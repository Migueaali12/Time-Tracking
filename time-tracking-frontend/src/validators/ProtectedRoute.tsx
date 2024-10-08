import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import CryptoJS from 'crypto-js'

interface ProtectedRouteProps {
    children: React.ReactNode;
    roles: Array<'USER' | 'ADMIN'>; // Acepta un array de roles
  }
  
  export function ProtectedRoute({ children, roles }: ProtectedRouteProps) {
      const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null); // null significa que está validando
      const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga
  
      useEffect(() => {
          const checkAuthorization = async () => {
              const encryptedToken = localStorage.getItem('authToken');
  
              if (encryptedToken) {
                debugger
                  try {
                      // Desencriptar el token usando la clave
                      const bytes = CryptoJS.AES.decrypt(encryptedToken, import.meta.env.VITE_REACT_APP_KEY);
                      const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);
  
                      const res = await fetch(`http://127.0.0.1:8000/api/user/validate-token`, {
                          method: 'GET',
                          headers: {
                              'Authorization': `Bearer ${decryptedToken}`,
                          },
                      });
  
                      const data = await res.json();
  
                      if (data.status === 200) {
                          // Verifica si el rol del usuario está en el array de roles permitidos
                          setIsAuthorized(roles.includes(data.user.role));
                      } else {
                          setIsAuthorized(false);
                      }
                  } catch (error) {
                      console.error('Error desencriptando el token:', error);
                      setIsAuthorized(false);
                  }
              } else {
                  setIsAuthorized(false);
              }
  
              setIsLoading(false); 
          };
  
          checkAuthorization();
      }, [roles]); // Dependencia agregada para roles
  
      if (isLoading) {
          return <div>Cargando...</div>; 
      }
  
      // Redirigir según la autorización
      if (isAuthorized) {
          return <>{children}</>; // Renderiza los hijos si está autorizado
      } else {
          return <Navigate to="/unauthorized" />; // Redirigir a unauthorized si no está autorizado
      }
  }