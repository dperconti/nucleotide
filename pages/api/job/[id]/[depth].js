// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import prisma from "../../../../lib/prisma"


export default async function handler(req, res) {
  const { id, depth } = req.query

  if (req.method === 'GET') {
    const job = await prisma.job.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        reportingJob: true
      },
    })
    // TODO: Create a way to add depth to this request.
    // From my research, there isn't a built-in way to
    // recursively get a depth for a given self-relation
    // Because of this, I would need to obtain the
    // reportingJob's ID, and then pull the same information

    res.status(200).json({ job })
  } else {
    res.status(200).json({ name: 'John Doe' })
  }
}