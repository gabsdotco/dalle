import { NextApiRequest, NextApiResponse } from "next";

import ImageKit from "imagekit";
import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from "@prisma/client";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

const prisma = new PrismaClient();

const handlePostCreate = async (req: NextApiRequest, res: NextApiResponse) => {

  const { description, image, userId } = req.body;

  if (!description || !image) {
    res.status(400).json({
      message: "Missing description or image"
    });
  } else {
    try {
      const { url: imageUrl } = await imagekit.upload({
        file: image,
        fileName: `${uuidv4()}.jpg`,
        folder: `dallgram/${process.env.IMAGEKIT_FOLDER}/post/${userId}`,
      });

      await prisma.post.create({
        data: {
          imageUrl: imageUrl,
          authorId: userId,
          description
        }
      })

      res.status(200).json({
        message: "Post created successfully",
      });
    } catch (error) {
      console.log({ error });

      res.status(500).json({
        message: "Error uploading image"
      });
    }
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    await handlePostCreate(req, res);
  } else {
    res.status(405).json({
      message: "Method not allowed"
    });
  }

  await prisma.$disconnect();

  res.end();
}