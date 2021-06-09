import styles from '../styles/Home.module.css'
import {
  Flex,
  Text,
  Link,
  Kbd,
  Stack
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
      setMunicipio_rand(municipios[_.random(0, municipios.length)]?.name);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (<>
    <Head>
      <title>AEMET clean clone</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property="og:title" content="AEMET clean clone" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://aemet-nextjs.vercel.app/" />
      <meta property="og:image" content="https://aemet-nextjs.vercel.app/sun.svg" />
      <meta property="og:description" content="Clon de AEMET con mayor limpieza" />
      <meta name="theme-color" content="#162b47" />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
    <Flex h={{ base: "92vh", md: "92vh", lg: "92vh" }} maxH={{ base: "80vh", md: "92vh", lg: "92vh" }} className={styles.flex_apply} flexDirection="column" justifyContent="space-between" alignContent="center" alignItems="center">
      <Text textAlign="center" color="black" fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}>Para comenzar busca un municipio en la barra de arriba.</Text>
      <Flex maxH="20rem" h="20rem" maxW="90vw" w="90vw" justifyContent="center" alignContent="center" alignItems="center">
        <Text textAlign="center" color="black" fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}>Escribe <Kbd><TextTransition inline={true} delay={100} text={_.capitalize(municipio_rand)} springConfig={presets.gentle} /></Kbd> y pulsa <Kbd>Intro</Kbd></Text>
      </ Flex>
      <Stack>
        <Text as="kbd" textAlign="center" color="black" fontSize={{ base: "xl", md: "xl", lg: "1xl" }}>Iconos creados por <Link color="teal.500" href="https://www.flaticon.com/authors/iconixar" isExternal>iconixar<ExternalLinkIcon mx="2px" /></Link></Text>
        <Text as="kbd" textAlign="center" color="black" fontSize={{ base: "xl", md: "xl", lg: "1xl" }}>Datos obtenidos de <Link color="teal.500" href="http://www.aemet.es/es/portada" isExternal>AEMET<ExternalLinkIcon mx="2px" /></Link></Text>
        <Text as="kbd" textAlign="center" color="black" fontSize={{ base: "xl", md: "xl", lg: "1xl" }}>UI creada con <Link color="teal.500" href="http://www.aemet.es/es/portada" isExternal>Chakra UI<ExternalLinkIcon mx="2px" /></Link> y <Link color="teal.500" href="https://nextjs.org/" isExternal>Next JS<ExternalLinkIcon mx="2px" /></Link></Text>
      </ Stack>
    </Flex>
  </>
  )
}
