import { VStack, Text, Flex } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import type { TMDB } from '@/types/tmdb'
import MovieCard from '@/components/MovieCard'
import SearchBar from '@/components/SearchBar'

const ListTab = () => {
  const [searchText, setSearchText] = useState('')
  const [data, setData] = useState([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`/api/tmdb?query=${searchText}`)
      const json = await res.json()

      setData(json)
    }
    if (searchText.length >= 3) getData()
  }, [searchText])

  return (
    <VStack>
      <SearchBar handleChange={handleChange} />
      <Flex wrap={'wrap'} justifyContent={'center'}>
        {data.map((item: TMDB) => (
          <MovieCard
            key={item.id}
            name={item.name}
            poster_path={item.poster_path}
            title={item.title}
          />
        ))}
      </Flex>
    </VStack>
  )
}

export default ListTab
