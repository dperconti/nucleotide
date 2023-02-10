// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import prisma from "../../../lib/prisma"


export default async function handler(req, res) {
  const { id } = req.query

  if (req.method === 'GET') {
    const job = await prisma.job.findUnique({
      where: {
        id,
      },
      include: {
        user: true
      },
    })
    res.status(200).json({ job })
  } if (req.method === 'PATCH') {
    handlePATCH(req, res)
  } else {
    res.status(200).json({ name: 'John Doe' })
  }
}


// Update a job
async function handlePATCH(req, res) {ƒ
  const { id } = req.query

  await prisma.job.update({
    where: {
      id
    },
    data: {
      ...req.body
    },
  })

  return res.status(204).json()
}