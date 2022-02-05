import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next'
import { getSession, signOut, useSession } from 'next-auth/react'
import { HStack, VStack, Avatar, Text, Button, Heading } from '@chakra-ui/react'
import { FiSettings, FiLogOut } from 'react-icons/fi'
import EmptyListCard from '@/components/EmptyListCard'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ItemCard from '@/components/ItemCard'
import { TMDB } from '@/types/tmdb'

const Home = ({ user }: ServerSideProps) => {
  const router = useRouter()
  const [list, setList] = useState<any>(null)
  const { data: session } = useSession()

  const getList = async (id: string) => {
    const url = `/api/list?userid=${id}`
    const res = await fetch(url)
    const json = await res.json()
    console.log(json)
    setList(json)
  }
  useEffect(() => {
    getList(user?.id as string)
  }, [user])

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

      {list?.items.length > 0 ? (
        <>
          <Heading size={'md'} w='full' pl='4' pt='10'>
            My Movie List
          </Heading>
          <HStack w='full' overflow={'scroll'}>
            {list.items.map((item: TMDB) => (
              <ItemCard
                key={item.id}
                id={item.id}
                title={item.title}
                name={item.name}
                poster_path={item.poster_path}
                media_type={item.media_type}
              />
            ))}
          </HStack>
        </>
      ) : (
        <EmptyListCard />
      )}
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
