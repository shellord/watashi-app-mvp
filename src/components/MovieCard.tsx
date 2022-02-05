import type { TMDB } from '@/types/tmdb'
import { Image, Box, Text } from '@chakra-ui/react'
import { AiOutlinePlusCircle } from 'react-icons/ai'

const IMAGE_URL = `https://image.tmdb.org/t/p/w500/`

const MovieCard = (props: TMDB) => {
  return (
    <Box
      mx={'10px'}
      borderWidth='1px'
      borderRadius='lg'
      _hover={{
        cursor: 'pointer',
      }}
      role='group'
      position={'relative'}
    >
      <Box
        position={'absolute'}
        mt={'50%'}
        zIndex={1}
        ml={'30%'}
        opacity={0}
        color='black'
        _groupHover={{
          opacity: '1',
        }}
        transition={'ease-in 0.2s'}
      >
        <AiOutlinePlusCircle fontSize={'60px'} />
      </Box>
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
        <Text fontWeight={'bold'}>{props.name}</Text>
        <Text fontWeight={'bold'}>{props.title}</Text>
      </Box>
    </Box>
  )
}

export default MovieCard
