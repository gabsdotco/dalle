import React, { useState } from "react";
import { styled, global } from "../stitches.config";

global({
  body: {
    margin: 0
  }
});

const Box = styled("div", {});

const Text = styled("p", {
  fontFamily: "$system"
});

const Link = styled("a", {
  fontFamily: "$system",
  textDecoration: "none",
  color: "$purple600"
});

const Container = styled("div", {
  marginX: "auto",
  paddingX: "$3",

  variants: {
    size: {
      1: {
        maxWidth: "300px"
      },
      2: {
        maxWidth: "585px"
      },
      3: {
        maxWidth: "865px"
      }
    }
  }
});

const CRAIYON_BACKEND_ENDPOINT = "https://backend.craiyon.com";

interface CraiyonBackendResponse {
  images: string[];
  version: string;
}

export default function App() {
  const [isLoading, setIsLoading] = useState(false);

  const [craiyonPrompt, setCraiyonPrompt] = useState<string>("");
  const [craiyonResponse, setCraiyonResponse] = useState<
    CraiyonBackendResponse
  >();

  const fetchCraiyonBackend = async (
    prompt: string
  ): Promise<CraiyonBackendResponse> => {
    const response = fetch(`${CRAIYON_BACKEND_ENDPOINT}/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt
      })
    }).then(async (res) => await res.json());

    return response;
  };

  const handlePromptSubmit = async () => {
    setIsLoading(true);

    try {
      const response = await fetchCraiyonBackend(craiyonPrompt);

      setCraiyonResponse(response);
    } catch (error) {
      console.log({ error });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // <Box css={{ paddingY: "$3" }}>
    //   <Container size={{ "@initial": "1", "@bp1": "2" }}>
    //     <Text as="h1">Hello, from Stitches.</Text>
    //     <Text>
    //       For full documentation, visit{" "}
    //       <Link href="https://stitches.dev">stitches.dev</Link>
    //     </Text>
    //   </Container>
    // </Box>
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>Insert prompt</p>
          <input
            value={craiyonPrompt}
            onChange={({ target }) => setCraiyonPrompt(target.value)}
          />
          <pre>{JSON.stringify(craiyonResponse, null, 2)}</pre>
          <button onClick={() => handlePromptSubmit()}>Submit</button>
        </>
      )}
    </div>
  );
}
