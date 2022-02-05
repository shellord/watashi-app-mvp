import type { TMDB } from '@/types/tmdb'
import { Image, Box, Text } from '@chakra-ui/react'

const IMAGE_URL = `https://image.tmdb.org/t/p/w500/`

const ItemCard = (props: TMDB) => {
  return (
    <Box mx={'10px'} borderWidth='1px' borderRadius='lg' height={'300px'}>
      <Image
        src={`${IMAGE_URL}${props.poster_path}`}
        alt='movie card'
        width={'150px'}
        height={'200px'}
        fallbackSrc='https://via.placeholder.com/150'
        rounded={'lg'}
        transition={'all 0.2s ease-in'}
        position={'relative'}
        _groupHover={{
          opacity: '0.5',
        }}
      />
      <Box width={'150px'}>
        <Text fontWeight={'bold'} fontSize='md'>
          {props.name}
        </Text>
        <Text fontWeight={'bold'} fontSize='md'>
          {props.title}
        </Text>
      </Box>
    </Box>
  )
}

export default ItemCard
