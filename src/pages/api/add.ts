import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  if (!session) {
    return res.status(401).json({ message: 'Not authenticated' })
  }
  const { id, media_type } = req.query as { id: string; media_type: string }
  if (!id) {
    return res.status(400).json({ message: 'No id provided' })
  }
  if (!media_type) {
    return res.status(400).json({ message: 'No media_type provided' })
  }
  const { user } = session
  const { id: userId } = user as { id: string }

  const data = await fetch(
    `http://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.TMDB_API_KEY}`
  )
  if (data.status !== 200) {
    return res.status(400).json({ message: 'Invalid id' })
  }
  const isExist = await prisma.items.findFirst({
    where: {
      itemId: id.toString(),
    },
  })

  if (isExist) {
    return res.status(400).json({ message: 'Item already exists' })
  }
  const json = await data.json()

  let name, poster_path, itemId

  poster_path = json.poster_path
  itemId = json.id

  if (media_type === 'movie') {
    name = json.title
  } else {
    name = json.name
  }

  const item = await prisma.items.create({
    data: {
      name,
      poster_path,
      media_type,
      userId,
      itemId: itemId.toString(),
    },
  })
  res.json({ name, poster_path, itemId, media_type, item })
}
