import '../styles/globals.css'
import Header from '../components/Header'
import {
  ChakraProvider
} from "@chakra-ui/react"
import { SWRConfig } from 'swr'
import NextNprogress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }) {

  return (
    <>
      <ChakraProvider>
        <SWRConfig value={{
          refreshInterval: 60000,
          fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
        }}>
          <NextNprogress
            color="#29D"
            startPosition={0.3}
            stopDelayMs={200}
            height={3}
            showOnShallow={true}
            options={{ showSpinner: false }}
          />
          <Header />
          <Component {...pageProps} />

        </SWRConfig>
      </ChakraProvider>
    </>
  );
}
export default MyApp