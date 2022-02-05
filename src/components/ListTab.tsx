import { VStack, Box, Flex, useToast, HStack, Heading } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import type { TMDB } from '@/types/tmdb'
import MovieCard from '@/components/MovieCard'
import SearchBar from '@/components/SearchBar'
import { useSession } from 'next-auth/react'
import ItemCard from '@/components/ItemCard'

const ListTab = () => {
  const [searchText, setSearchText] = useState('')
  const [data, setData] = useState([])
  const [list, setList] = useState<any>(null)
  const { data: session } = useSession()
  const toast = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  const getList = async (id: string) => {
    const url = `/api/list?userid=${id}`
    const res = await fetch(url)
    const json = await res.json()
    setList(json)
  }
  useEffect(() => {
    const id = session?.user?.id
    if (id) {
      getList(id)
    }
  }, [session])

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`/api/search?query=${searchText}`)
      const json = await res.json()

      setData(json)
    }
    if (searchText.length >= 3) getData()
  }, [searchText])

  const AddItem = async (id: string, media_type: string) => {
    const res = await fetch(`/api/add?id=${id}&media_type=${media_type}`)
    const json = await res.json()
    if (res.status === 200) {
      toast({
        title: 'Item Added',
        description: 'New item has been added to your list',
        status: 'success',
        duration: 2000,
        position: 'top-right',
      })
    }
    if (res.status === 400) {
      toast({
        title: 'Item already in list',
        description: 'This item is already in your list',
        status: 'error',
        duration: 2000,
        position: 'top-right',
      })
    }
    if (session) {
      getList(session?.user.id?.toString() as string)
    }
  }
  return (
    <VStack alignItems={'flex-start'} mt='10'>
      <Heading size={'md'} ml='2' mb='5'>
        My Movie List
      </Heading>
      {list && (
        <HStack overflow={'scroll'} w='full' pb='10'>
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
      )}

      <SearchBar handleChange={handleChange} />
      <Flex justifyContent={'center'} wrap='wrap' pt='10'>
        {data.map((item: TMDB) => (
          <Box
            key={item.id}
            flex={1}
            width={'150px'}
            onClick={() => AddItem(item.id.toString(), item.media_type)}
          >
            <MovieCard
              id={item.id}
              media_type={item.media_type}
              name={item.name}
              poster_path={item.poster_path}
              title={item.title}
            />
          </Box>
        ))}
      </Flex>
    </VStack>
  )
}

export default ListTab
