import { AppProps as NextAppProps } from "next/app";

import { SessionProvider, useSession } from "next-auth/react";
import { Session } from "next-auth";
import Head from "next/head";

interface AppProps {
  session: Session;
}

const App = ({
  Component,
  pageProps: { session, ...pageProps }
}: NextAppProps<AppProps>) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Dallgram</title>
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default App;
