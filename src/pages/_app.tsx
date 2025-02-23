import "@/styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/notifications/styles.css";
import type {AppProps} from "next/app";
import {useRouter} from "next/router";
import {MantineProvider} from "@mantine/core";
import {Notifications} from "@mantine/notifications";

export default function App({Component, pageProps}: AppProps) {

  const router = useRouter();
  const getLayout = Component.getLayout ?? ((page: React.ReactElement) => page);

  return (
    <main>
      <MantineProvider>
        <Notifications/>
        <div>{getLayout(<Component {...pageProps} />)}</div>
      </MantineProvider>
    </main>
  )
}

