// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import prisma from "../../lib/prisma"
import {v4 as uuidv4} from 'uuid';


export default async function handler(req, res) {
  if (req.method === 'GET') {
    const jobs = await prisma.job.findMany()
    res.status(200).json({ jobs: jobs })
  } else if (req.method === 'POST') {
    return await handlePOST(req, res)
  } else {
    res.status(200).json({ name: 'John Doe' })
  }
}

async function handlePOST(req, res) {
  const job = await prisma.job.create({
    data: {
      id: uuidv4(),
      ...req.body
    },
  })

  return res.status(201).json(job)
}