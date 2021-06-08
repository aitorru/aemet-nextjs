import styles from '../styles/Home.module.css'
import {
  Flex,
  Text,
  Link,
  Kbd
} from "@chakra-ui/react"
import {
  ExternalLinkIcon,
} from '@chakra-ui/icons'
import Head from 'next/head'
import municipios from '../public/municipios/aemetdata.json'
import { useState, useEffect } from 'react'
var _ = require('lodash');
import TextTransition, { presets } from "react-text-transition";

export default function Home() {

  const [municipio_rand, setMunicipio_rand] = useState(municipios[_.random(0, municipios.length)].name);

  useEffect(() => {
    const interval = setInterval(() => {
      setMunicipio_rand(municipios[_.random(0, municipios.length)].name);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (<>
    <Head>
      <title>AEMET clean clone</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" /></Head>
    <Flex h="100%" className={styles.flex_apply} flexDirection="column" justifyContent="center" alignContent="center" alignItems="center">
      <Text textAlign="center" color="black" fontSize="6xl">Para comenzar busca un municipio en la barra de arriba.</Text>
      <Flex maxH="20rem" h="20rem" maxW="90vw" w="90vw" margin="5rem" justifyContent="center" alignContent="center" alignItems="center">
        <Text textAlign="center" color="black" fontSize="4xl">Escribe <Kbd><TextTransition inline={true} delay={100} text={_.capitalize(municipio_rand)} springConfig={presets.gentle} /></Kbd> y pulsa <Kbd>Intro</Kbd></Text>
      </ Flex>
      <Text as="kbd" textAlign="center" color="black" fontSize="2xl">Iconos creados por <Link color="teal.500" href="https://www.flaticon.com/authors/iconixar" isExternal>iconixar<ExternalLinkIcon mx="2px" /></Link></Text>
      <Text as="kbd" textAlign="center" color="black" fontSize="2xl">Datos obtenidos de <Link color="teal.500" href="http://www.aemet.es/es/portada" isExternal>AEMET<ExternalLinkIcon mx="2px" /></Link></Text>
      <Text as="kbd" textAlign="center" color="black" fontSize="2xl">UI creada con <Link color="teal.500" href="http://www.aemet.es/es/portada" isExternal>Chakra UI<ExternalLinkIcon mx="2px" /></Link> y <Link color="teal.500" href="https://nextjs.org/" isExternal>Next JS<ExternalLinkIcon mx="2px" /></Link></Text>
    </Flex>
  </>
  )
}
