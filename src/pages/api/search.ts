import type { NextApiRequest, NextApiResponse } from 'next'
import type { TMDB } from '@/types/tmdb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req.query
  const tmdb_response = await fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
  )
  const json = await tmdb_response.json()
  const list: TMDB[] = []

  json.results.map((item: TMDB) => {
    list.push({
      media_type: item.media_type,
      id: item.id,
      name: item.name,
      poster_path: item.poster_path,
      title: item.title,
    })
  })

  res.status(200).json(list)
}
