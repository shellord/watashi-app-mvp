import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userid } = req.query as { userid: string }
  if (!userid) {
    return res.status(400).json({ message: 'No id provided' })
  }
  const items = await prisma.items.findMany({
    where: {
      userId: userid,
    },
  })
  res.status(200).json({ items })
}
