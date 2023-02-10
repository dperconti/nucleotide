// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import prisma from "../../../lib/prisma"


export default async function handler(req, res) {
  const { id } = req.query

  if (req.method === 'GET') {
    const job = await prisma.organization.findUnique({
      where: {
        id,
      }
    })
    res.status(200).json({ job })
  } else if (req.method === 'POST') {
    return await handlePOST(req, res)
  } else {
    res.status(200).json({ name: 'John Doe' })
  }
}

async function handlPOST(req, res) {
  const body = JSON.parse(req.body)

  return res.status(200).json(body)
}