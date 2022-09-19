import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";
import { unstable_getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const session = await unstable_getServerSession(req, res, authOptions);

    if (session) {
      const user = await prisma.user.findFirst({
        where: {
          id: session.user?.id
        },
        include: {
          posts: true
        }
      });

      res.status(200).json(user);
      res.end()
    } else {
      res.status(401).json({
        message: "Unauthorized"
      });
    }
  } else {
    res.status(405).json({
      message: "Method not allowed"
    });
  }

  await prisma.$disconnect();

  res.end()
};
