// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import prisma from "../../lib/prisma"

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const organizations = await prisma.organization.findMany()
    res.status(200).json({ organizations })
  } else {
    res.status(200).json({ name: 'John Doe' })
  }
}