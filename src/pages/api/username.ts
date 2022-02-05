import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  const { username } = req.query as { username: string }
  if (!session) {
    return res.status(401).json({ message: 'Not authenticated' })
  }
  if (!username) {
    return res.status(400).json({ message: 'No username provided' })
  }
  const { id: userId } = session.user as { id: string }

  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      username,
    },
  })
  res.json({ user })
}
