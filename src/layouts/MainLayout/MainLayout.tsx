import { FC } from "react";

import { Flex, Header } from "@/components";

export const MainLayout: FC = ({ children }) => {
  return (
    <Flex
      align="center"
      direction="column"
      css={{
        width: "100vw",
        height: "100vh",
        overflow: "auto"
      }}
    >
      <Header />
      {children}
    </Flex>
  );
};
