import '../styles/globals.css'
import Header from '../components/Header'
import {
  ChakraProvider
} from "@chakra-ui/react"
import { SWRConfig } from 'swr'

function MyApp({ Component, pageProps }) {

  return (
    <>
      <ChakraProvider>
        <SWRConfig value={{
          refreshInterval: 60000,
          fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
        }}>
          <Header />
          <Component {...pageProps} />
          <div>Icons made by <a href="https://www.flaticon.com/authors/iconixar" title="iconixar">iconixar</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        </SWRConfig>
      </ChakraProvider>
    </>
  );
}
export default MyApp
