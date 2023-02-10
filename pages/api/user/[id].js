// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import prisma from "../../../lib/prisma"


export default async function handler(req, res) {
  console.log(req.method)
  if (req.method === 'GET') {
    return await handleGET(req, res)
  } else if (req.method === 'PATCH') {
    return await handlePATCH(req, res)
  } else {
    res.status(200).json({ name: 'John Doe' })
  }
}

// Update a user
async function handlePATCH(req, res) {
  const { id } = req.query
  const { jobId } = req.body

  // If the jobId exists in the update request, we need to remove the other user from that job.
  if (jobId != null) {
    const previousUser = await prisma.user.findUnique({
      where: {
        jobId
      }
    })

    await prisma.user.update({
        where: {
          id: previousUser.id
      },
      data: {
        jobId: null
      }
    })
  }

  // Otherwise, update all of the fields
  await prisma.user.update({
    where: {
      id
    },
    data: {
      ...req.body
    },
  })

  return res.status(204).json()
}

async function handleGET(req, res) {
  const { id } = req.query
  const user = await prisma.user.findUnique({
      where: {
        id,
    },
    include: {
      job: true
    },
  })
  return res.status(200).json({ user })
}