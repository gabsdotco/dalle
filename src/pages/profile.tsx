import { useEffect, useState } from "react";

import axios from "axios";
import { Post, User } from "@prisma/client";
import { unstable_getServerSession } from "next-auth";
import { GetServerSideProps, NextPage } from "next";

import { styled } from "@/theme";
import { MainLayout } from "@/layouts";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Flex, Heading, Text } from "@/components";

const StyledImage = styled("img", {
  width: "100%",
  height: "100",
  objectFit: "cover"
});

const StyledGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "$sm"
});

interface UserWithPosts extends User {
  posts: Post[];
}

const ProfilePage: NextPage = () => {
  const [user, setUser] = useState<UserWithPosts>(null);

  const getUser = async () => {
    const { data } = await axios.get(`${process.env.NEXTAUTH_URL}/api/user`);

    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <MainLayout>
      <Flex
        direction="column"
        css={{
          width: "100%",
          maxWidth: "720px",
          paddingInline: "$2xl",
          paddingTop: "$xl",
          paddingBottom: "$4xl",
          gap: "$lg",
          overflow: "auto",

          "&::-webkit-scrollbar": {
            width: "0px"
          }
        }}
      >
        <Flex align="center" css={{ gap: "$md" }}>
          <StyledImage
            src={user?.image}
            css={{
              width: "60px",
              height: "60px",
              maxWidth: "60px",
              maxHeight: "60px",
              objectFit: "cover",
              borderRadius: "50%",
              border: "1px solid $gray-500"
            }}
          />

          <Flex direction="column" css={{ gap: "$xs" }}>
            <Heading>{user?.name}</Heading>

            <Text>{user?.email}</Text>
          </Flex>
        </Flex>

        <Flex direction="column" css={{ gap: "$lg" }}>
          <Heading css={{ fontSize: "$lg" }}>Your Posts</Heading>

          <StyledGrid>
            {user?.posts?.map((post, idx) => (
              <Flex
                role="group"
                css={{
                  width: "100%",
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

export default ProfilePage;
