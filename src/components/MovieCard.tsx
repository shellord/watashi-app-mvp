import type { TMDB } from '@/types/tmdb'
import { Image, Box, HStack, Text } from '@chakra-ui/react'

const IMAGE_URL = `https://image.tmdb.org/t/p/w500/`

const MovieCard = (props: TMDB) => {
  return (
    <Box mx={'10px'} borderWidth='1px' borderRadius='lg'>
      <Image
        src={`${IMAGE_URL}${props.poster_path}`}
        alt='movie card'
        width={'150px'}
        height={'200px'}
        fallbackSrc='https://via.placeholder.com/150'
        rounded={'lg'}
      />
      <Box width={'150px'}>
        <Text fontWeight={'bold'}>{props.name}</Text>
        <Text fontWeight={'bold'}>{props.title}</Text>
      </Box>
    </Box>
  )
}

export default MovieCard
