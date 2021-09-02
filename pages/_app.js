import '../styles/globals.css'
import Header from '../components/Header'
import {
  ChakraProvider
} from "@chakra-ui/react"
import { SWRConfig } from 'swr'
import NextNprogress from 'nextjs-progressbar';
import { AppContextProvider } from "../contexts/AppContext";


function MyApp({ Component, pageProps }) {

  return (
    <>
      <AppContextProvider>
        <ChakraProvider>
          <SWRConfig value={{
            refreshInterval: 600000,
            fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
          }}>
            <NextNprogress
              color="#5fa2d7"
              startPosition={0.7}
              stopDelayMs={100}
              height={2}
              showOnShallow={true}
              options={{ showSpinner: false, easing: 'ease', speed: 200 }}
            />
            <Header />
            <Component {...pageProps} />
          </SWRConfig>
        </ChakraProvider>
      </AppContextProvider>
    </>
  );
}
export default MyApp
