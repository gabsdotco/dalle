import { GetServerSideProps, NextPage } from "next";

import { signIn } from "next-auth/react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { unstable_getServerSession } from "next-auth";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Button, Flex, Heading, Text } from "@/components";

const AuthPage: NextPage = () => {
  return (
    <Flex
      justify="center"
      css={{ width: "100vw", height: "100vh", padding: "$2xl" }}
    >
      <Flex
        align="center"
        justify="center"
        direction="column"
        css={{
          gap: "$md",
          width: "fit-content",
          height: "100%",
          maxWidth: "720px"
        }}
      >
        <Flex direction="column" css={{ width: "100%", gap: "$sm" }}>
          <Heading css={{ fontSize: "$lg", fontWeight: "bold" }}>Login</Heading>

          <Text css={{ color: "$gray-600" }}>
            Choose one of the options below to procced with
            <br /> the authentication
          </Text>
        </Flex>

        <Flex justify="start" css={{ width: "100%", gap: "$sm" }}>
          <Button
            secondary
            css={{ paddingInline: "$lg" }}
            onClick={() => signIn("github")}
          >
            <FaGithub size="18px" />
          </Button>

          <Button
            secondary
            css={{ paddingInline: "$lg" }}
            onClick={() => signIn("google")}
          >
            <FaGoogle size="18px" />
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (session) {
    return {
      redirect: {
        destination: "/explore",
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

export default AuthPage;
