import { NextApiRequest, NextApiResponse } from "next";

import axios from "axios";

import { CraiyonResponse } from "@/types";

const CRAIYON_BACKEND_ENDPOINT = "https://backend.craiyon.com";

interface RequestBody {
  prompt: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { prompt } = req.body as RequestBody;

  if (!prompt) {
    res.status(400).json({
      message: "Missing prompt"
    });
  } else {
    const { data } = await axios.post(`${CRAIYON_BACKEND_ENDPOINT}/generate`, {
      prompt
    });

    res.status(200).json(data as CraiyonResponse);
  }

  res.end();
};
