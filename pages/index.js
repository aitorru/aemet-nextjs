import styles from '../styles/Home.module.css'
import {
  Flex,
  Text,
} from "@chakra-ui/react"
import {
} from '@chakra-ui/icons'
import Head from 'next/head'

export default function Home() {


  return (<>
    <Head>
      <title>AEMET clean clone</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" /></Head>
    <Flex h="100%" className={styles.flex_apply} flexDirection="column" justifyContent="center" alignContent="center" alignItems="center">
      <Text textAlign="center" color="black" fontSize="6xl">Para comenzar busca un municipio en la barra de arriba.</Text>
    </Flex>
  </>
  )
}
