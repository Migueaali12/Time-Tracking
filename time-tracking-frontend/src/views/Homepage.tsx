import { Button } from '@chakra-ui/react'
import { LoginLayout } from '../components/Layaout'
import { Link } from 'react-router-dom'

export function Homepage() {
  return (
    <LoginLayout>
      <main>
        <h1 className="text-9xl font-bold italic">Time Tracking</h1>
        <section className="flex py-5">
        <Button colorScheme="blue" >
            <Link to={'/register'}>Registrate</Link>
          </Button>
          <h2 className="self-center font-bold mx-3">O</h2>
          <Button colorScheme="blue" >
            <Link to={'/login'}>Inicia Sesión</Link>
          </Button>
        </section>
      </main>
    </LoginLayout>
  )
}
