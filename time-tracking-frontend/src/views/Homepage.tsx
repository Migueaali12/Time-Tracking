import { Card, CardBody, Box, AlertDescription } from '@chakra-ui/react';
import { HomePageLayout } from '../layouts/HomeLayout'

export function Homepage() {
  return (
    <HomePageLayout>
      <Card height={'40%'} width={'60%'} my={'280px'}>
        <CardBody display={'flex'} justifyContent={'space-between'} alignItems={'center'} p={'10'}>
          <h1 className="text-5xl font-bold italic">Registra tu llegada</h1>
          <Box width={'30%'} height={'full'} bg={'blue.200'}>
            
          </Box>
        </CardBody>
      </Card>
    </HomePageLayout>
  )
}
