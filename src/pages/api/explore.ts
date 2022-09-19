import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const posts = await prisma.post.findMany({
      take: 12
    })

    return res.status(200).json(posts);
  } else {
    res.status(405).json({
      message: "Method not allowed"
    });
  }

  await prisma.$disconnect();

  res.end();
}