import { VStack, Button, HStack } from '@chakra-ui/react'
import { NextPage } from 'next'
import { MdArrowBack } from 'react-icons/md'
import { useRouter } from 'next/router'
import TabStack from '@/components/TabStack'

const Index: NextPage = ({ children }) => {
  const router = useRouter()

  return (
    <VStack alignItems={'flex-start'}>
      <HStack justifyContent={'flex-end'} w={'full'}>
        <Button onClick={() => router.push('/')}>
          <MdArrowBack />
        </Button>
      </HStack>
      <TabStack />
    </VStack>
  )
}

export default Index
