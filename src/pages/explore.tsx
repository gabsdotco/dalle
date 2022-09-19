import React, { useEffect, useState } from "react";

import { NextPage } from "next";
import axios from "axios";
import { Post } from "@prisma/client";

import { Flex, Heading, Text } from "@/components";
import { MainLayout } from "@/layouts";
import { styled } from "@/theme";

const StyledGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "$sm"
});

const StyledImage = styled("img", {
  width: "100%",
  height: "100",
  objectFit: "cover",
  transitionDuration: "0.5s"
});

const ExplorePage: NextPage = () => {
  const [posts, setPosts] = useState<Post[]>();

  const getExplorePosts = async () => {
    const { data } = await axios.get<Post[]>(
      `${process.env.NEXTAUTH_URL}/api/explore`
    );

    setPosts(data);
  };

  useEffect(() => {
    getExplorePosts();
  }, []);

  return (
    <MainLayout>
      <Flex
        direction="column"
        css={{
          width: "100%",
          maxWidth: "720px",
          gap: "$lg",
          overflow: "auto",
          paddingBottom: "$4xl",
          paddingInline: "$2xl",

          "&::-webkit-scrollbar": {
            width: "0px"
          }
        }}
      >
        <Flex direction="column" css={{ gap: "$sm" }}>
          <Heading css={{ fontSize: "$xl" }}>Explore</Heading>

          <Text css={{ color: "$gray-600" }}>
            See the lastest posts created by the community.
          </Text>
        </Flex>

        <StyledGrid>
          {posts?.map((post, idx) => (
            <Flex
              role="group"
              css={{
                width: "100%",
                gridColumn: idx === 0 ? "1/3" : "auto",
                gridRow: idx === 0 ? "1/3" : "auto",
                position: "relative"
              }}
            >
              <StyledImage
                src={post.imageUrl}
                css={{
                  width: "100%"
                }}
              />

              <Flex
                justify="start"
                align="end"
                css={{
                  opacity: "0",
                  padding: "$md",
                  background: "rgba(1, 1, 1, 0.3)",
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  color: "white",
                  width: "100%",
                  height: "100%",

                  "&:hover": {
                    opacity: "1",
                    transitionDuration: "0.2s"
                  }
                }}
              >
                <Text
                  css={{
                    color: "white",
                    display: "-webkit-box",
                    "-webkit-line-clamp": 3,
                    "-webkit-box-orient": "vertical",
                    overflow: "hidden"
                  }}
                >
                  {post.description}
                </Text>
              </Flex>
            </Flex>
          ))}
        </StyledGrid>
      </Flex>
    </MainLayout>
  );
};

export default ExplorePage;
