import { AppProps as NextAppProps } from "next/app";

import { SessionProvider, useSession } from "next-auth/react";
import { Session } from "next-auth";
import { FC, useEffect, useMemo } from "react";
import { useRouter } from "next/router";

interface AppProps {
  session: Session;
}

const App = ({
  Component,
  pageProps: { session, ...pageProps }
}: NextAppProps<AppProps>) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default App;
