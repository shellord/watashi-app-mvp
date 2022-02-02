import { NextPage } from 'next'
import { Container, Box } from '@chakra-ui/react'

const MainLayout: NextPage = ({ children }) => {
  return (
    <Box py={2}>
      <Container minH={'100vh'} maxW={'2xl'}>
        {children}
      </Container>
    </Box>
  )
}

export default MainLayout
