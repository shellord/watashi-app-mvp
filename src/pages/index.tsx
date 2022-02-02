import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next'
import { getSession } from 'next-auth/react'
import { Button } from '@chakra-ui/react'
import { signOut } from 'next-auth/react'
import { HStack, VStack, Avatar } from '@chakra-ui/react'
import { FiSettings, FiLogOut } from 'react-icons/fi'

const Home = ({ user }: ServerSideProps) => {
  return (
    <VStack>
      <HStack justifyContent={'flex-end'} width={'full'}>
        <Button color={'blue.600'}>
          <FiSettings />
        </Button>
        <Button onClick={() => signOut()} color={'red.600'}>
          <FiLogOut />
        </Button>
      </HStack>
      <Avatar size={'xl'} />
      <p>{user?.name}</p>
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
