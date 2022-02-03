import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next'
import { getSession } from 'next-auth/react'
import { Button } from '@chakra-ui/react'
import { signOut } from 'next-auth/react'
import { HStack, VStack, Avatar, Text } from '@chakra-ui/react'
import { FiSettings, FiLogOut } from 'react-icons/fi'
import EmptyListCard from '@/components/EmptyListCard'
import { useRouter } from 'next/router'

const Home = ({ user }: ServerSideProps) => {
  const router = useRouter()
  return (
    <VStack>
      <HStack justifyContent={'flex-end'} width={'full'}>
        <Button onClick={() => router.push('/settings')}>
          <FiSettings />
        </Button>
        <Button onClick={() => signOut()} color={'red.600'}>
          <FiLogOut />
        </Button>
      </HStack>
      <Avatar size={'xl'} />
      <Text fontSize={'xl'}>{user?.name}</Text>
      <EmptyListCard />
    </VStack>
  )
}

type ServerSideProps = InferGetServerSidePropsType<typeof getServerSideProps>

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession({ req: ctx.req })
  if (!session) {
    return {
      redirect: { destination: '/auth/signin' },
      props: {},
    }
  }
  const { user } = session
  return {
    props: { user },
  }
}
export default Home
