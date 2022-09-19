import { FC, useMemo } from "react";

import { signOut, useSession } from "next-auth/react";
import NextLink from "next/link";

import { Flex } from "../Flex";
import { Text } from "../Text";

export const Header: FC = () => {
  const { status } = useSession();

  const isAuthenticated = useMemo(() => status === "authenticated", [status]);

  return (
    <Flex
      align="center"
      justify="between"
      css={{
        width: "100%",
        maxWidth: "720px",
        paddingBlock: "$xl",
        paddingInline: "$2xl"
      }}
    >
      <NextLink href="/explore">
        <Text
          css={{
            color: "$gray-500",
            cursor: "pointer",
            fontWeight: "400",
            "&:hover": {
              color: "$gray-700",
              textDecoration: "underline"
            }
          }}
        >
          explore
        </Text>
      </NextLink>
      <Flex align="center" css={{ gap: "$md" }}>
        {isAuthenticated ? (
          <>
            <NextLink href="/generator">
              <Text
                css={{
                  color: "$gray-500",
                  cursor: "pointer",
                  fontWeight: "400",
                  "&:hover": {
                    color: "$gray-700",
                    textDecoration: "underline"
                  }
                }}
              >
                new +
              </Text>
            </NextLink>
            <NextLink href="/profile">
              <Text
                css={{
                  color: "$gray-500",
                  cursor: "pointer",
                  fontWeight: "400",
                  "&:hover": {
                    color: "$gray-700",
                    textDecoration: "underline"
                  }
                }}
              >
                profile
              </Text>
            </NextLink>
            <Text
              css={{
                color: "$gray-500",
                cursor: "pointer",
                fontWeight: "400",
                "&:hover": {
                  color: "$gray-700",
                  textDecoration: "underline"
                }
              }}
              onClick={() => signOut()}
            >
              logout
            </Text>
          </>
        ) : (
          <NextLink href="/auth">
            <Text
              css={{
                color: "$gray-500",
                cursor: "pointer",
                fontWeight: "400",
                "&:hover": { color: "$gray-700", textDecoration: "underline" }
              }}
            >
              login
            </Text>
          </NextLink>
        )}
      </Flex>
    </Flex>
  );
};
