import { NextPage } from 'next'
import { Container, Box } from '@chakra-ui/react'

const MainLayout: NextPage = ({ children }) => {
  return (
    <Box background={'gray.200'}>
      <Container minH={'100vh'} maxW={'2xl'} pt={8}>
        {children}
      </Container>
    </Box>
  )
}

export default MainLayout
