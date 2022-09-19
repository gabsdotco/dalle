import { useState } from "react";

import { useRouter } from "next/router";
import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import { FaTimes } from "react-icons/fa";
import { Session, unstable_getServerSession } from "next-auth";

import { styled } from "@/theme";
import { MainLayout } from "@/layouts";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { CraiyonResponse } from "@/types";
import { Button, Flex, Input, Text, Textarea } from "@/components";
import { useSession } from "next-auth/react";

const GENERATE_ENDPOINT = "http://localhost:3000/api/generate";

const StyledGrid = styled("div", {
  gap: "$sm",
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)"
});

const StyledImage = styled("img", {
  width: "100%",
  height: "100",
  objectFit: "cover"
});

const GeneratorPage: NextPage = () => {
  const router = useRouter();
  const session = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  const [craiyonPrompt, setCraiyonPrompt] = useState<string>("");
  const [craiyonResponse, setCraiyonResponse] = useState<CraiyonResponse>();
  const [craiyonSelectedImage, setCraiyonSelectedImage] = useState<string>("");
  const [craiyonSelectedImageDescription, setCraiyonSelectedImageDescription] =
    useState<string>("");

  const fetchCraiyonBackend = async (prompt: string) => {
    const { data } = await axios.post(GENERATE_ENDPOINT, {
      prompt
    });

    return data as unknown as CraiyonResponse;
  };

  const handlePromptSubmit = async () => {
    setIsLoading(true);

    try {
      const response = await fetchCraiyonBackend(craiyonPrompt);

      setCraiyonResponse(response);
    } catch ({
      response: {
        data: { message }
      }
    }) {
      console.log({ message });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePostSubmit = async () => {
    setIsPosting(true);

    try {
      await axios.post(`${process.env.API_URL}/api/post`, {
        image: craiyonSelectedImage,
        userId: session?.data?.user?.id,
        description: craiyonSelectedImageDescription
      });

      setCraiyonSelectedImage(null);
      setCraiyonSelectedImageDescription("");

      router.push("/profile");
    } catch (error) {
      console.log({ error });
    } finally {
      setIsPosting(false);
    }
  };

  const getBase64Image = (image: string) => `data:image/png;base64,${image}`;

  return (
    <MainLayout>
      <Flex
        direction="column"
        css={{
          width: "100%",
          height: "100%",
          paddingInline: "$2xl",
          paddingTop: !!craiyonResponse && "100px",
          overflow: "auto",

          "&::-webkit-scrollbar": {
            width: "0px"
          }
        }}
      >
        <Flex
          align="center"
          direction="column"
          css={{ width: "100%", height: "100%" }}
        >
          {isLoading || isPosting ? (
            <Flex
              justify="center"
              direction="column"
              css={{
                width: "100%",
                height: "100%",
                maxWidth: "720px",
                gap: "$sm"
              }}
            >
              <Text
                css={{ fontWeight: "700", fontSize: "$lg", color: "$gray-700" }}
              >
                Loading...
              </Text>
              <Text css={{ color: "$gray-600" }}>
                {isLoading
                  ? "Generating your images, it can take a while, please be patient."
                  : "Posting your image, please wait."}
              </Text>
            </Flex>
          ) : (
            <Flex
              align="center"
              direction="column"
              justify={craiyonResponse ? "start" : "center"}
              css={{
                width: "100%",
                height: "100%",
                maxWidth: "720px",
                gap: "82px"
              }}
            >
              <Flex direction="column" css={{ width: "100%", gap: "$md" }}>
                <Text>Start with a detailed description for your image</Text>
                <Input
                  value={craiyonPrompt}
                  placeholder="Insert your prompt..."
                  onChange={({ target }) => setCraiyonPrompt(target.value)}
                />
                <Flex justify="end" align="center" css={{ gap: "$md" }}>
                  <Button
                    secondary
                    onClick={() => {
                      setCraiyonPrompt("");
                      setCraiyonResponse(null);
                    }}
                  >
                    Clear
                  </Button>
                  <Button
                    disabled={!craiyonPrompt}
                    onClick={() => !!craiyonPrompt && handlePromptSubmit()}
                  >
                    Generate
                  </Button>
                </Flex>
              </Flex>
              {craiyonResponse && (
                <StyledGrid css={{ width: "100%", paddingBottom: "108px" }}>
                  {craiyonResponse.images.map((image, index) => (
                    <StyledImage
                      key={index}
                      src={getBase64Image(image)}
                      css={{
                        opacity: "0.7",
                        cursor: "pointer",
                        filter: "grayscale(100%)",
                        "&:active": {
                          transform: "scale(0.95)",
                          transitionDuration: "0.2s"
                        },
                        "&:hover": {
                          filter: "grayscale(0%)",
                          opacity: "1",
                          transitionDuration: "0.2s"
                        }
                      }}
                      onClick={() => {
                        setCraiyonSelectedImageDescription(craiyonPrompt);
                        setCraiyonSelectedImage(getBase64Image(image));
                      }}
                    />
                  ))}
                </StyledGrid>
              )}
            </Flex>
          )}
          {!!craiyonSelectedImage && !isPosting && (
            <Flex
              align="center"
              justify="center"
              css={{
                width: "100vw",
                height: "100vh",
                padding: "$2xl",
                position: "absolute",
                top: "0",
                left: "0"
              }}
            >
              <Flex
                css={{
                  top: "0",
                  left: "0",
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  background: "black",
                  opacity: "0.5",
                  zIndex: "1"
                }}
              />
              <Flex
                direction="column"
                css={{
                  width: "100%",
                  maxWidth: "520px",
                  backgroundColor: "white",
                  zIndex: "2"
                }}
              >
                <Flex
                  justify="between"
                  css={{
                    padding: "$md",
                    borderBottom: "1px solid $gray-300"
                  }}
                >
                  <Text>Post Generated Image</Text>
                  <FaTimes
                    color="hsl(206,10%,34%)"
                    cursor="pointer"
                    onClick={() => {
                      setCraiyonSelectedImage(null);
                      setCraiyonSelectedImageDescription("");
                    }}
                  />
                </Flex>
                <Flex
                  css={{
                    gap: "$md",
                    padding: "$md"
                  }}
                >
                  <StyledImage
                    src={craiyonSelectedImage}
                    css={{ width: "200px" }}
                  />
                  <Flex
                    direction="column"
                    css={{ width: "100%", height: "100%" }}
                  >
                    <Flex
                      direction="column"
                      css={{ gap: "$sm", height: "100%" }}
                    >
                      <Text css={{ fontSize: "$sm" }}>Description</Text>
                      <Textarea
                        rows={10}
                        placeholder="Insert a cool description..."
                        value={craiyonSelectedImageDescription}
                        css={{ padding: "$md", height: "100%" }}
                        onChange={({ target }) =>
                          setCraiyonSelectedImageDescription(target.value)
                        }
                      />
                    </Flex>
                  </Flex>
                </Flex>
                <Flex
                  justify="end"
                  css={{
                    gap: "$md",
                    padding: "$md",
                    borderTop: "1px solid $gray-300"
                  }}
                >
                  <Button
                    secondary
                    onClick={() => {
                      setCraiyonSelectedImage(null);
                      setCraiyonSelectedImageDescription("");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={() => handlePostSubmit()}>Post Image</Button>
                </Flex>
              </Flex>
            </Flex>
          )}
        </Flex>
      </Flex>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false
      }
    };
  }

  return {
    props: {
      session
    }
  };
};

export default GeneratorPage;
