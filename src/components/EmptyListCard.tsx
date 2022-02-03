import { VStack, Button, Heading, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'

const EmptyListCard = () => {
  const router = useRouter()
  return (
    <VStack w={'full'} background={'white'} py={'20'} shadow={'sm'}>
      <Heading size={'md'}>You Haven&apos;t added any list.</Heading>
      <Text>Welcome 👋 Let&apos;s get started.</Text>
      <Button onClick={() => router.push('/settings#list')}>
        Create your first list
      </Button>
    </VStack>
  )
}

export default EmptyListCard
