import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { RegisterForm } from './components/RegisterForm.tsx'
import { LoginForm } from './components/LoginForm.tsx'
import { Homepage } from './views/Homepage.tsx'
import { AdminView } from './views/Admin.tsx'
import { UserView } from './views/User.tsx'
import { ProtectedRoute } from './validators/ProtectedRoute.tsx'
import { UnauthorizedView } from './views/Unauthorized.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
  },
  {
    path: '/register',
    element: <RegisterForm />,
  },
  {
    path: '/login',
    element: <LoginForm />,
  },
  {
    path: '/admin-dashboard',
    element: (
      <ProtectedRoute roles={['ADMIN']}>
        <AdminView />
      </ProtectedRoute>
    ),
  },
  {
    path: '/user-dashboard',
    element: (
      <ProtectedRoute roles={['USER', 'ADMIN']}>
        <UserView />
      </ProtectedRoute>
    ),
  },
  {
    path: '/unauthorized',
    element: <UnauthorizedView />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </StrictMode>,
)
