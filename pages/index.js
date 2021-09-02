import {
  Flex,
  Text,
  Link,
  Stack,
  Heading,
  Spinner,
} from "@chakra-ui/react"
import {
  ExternalLinkIcon,
} from '@chakra-ui/icons'
import Head from 'next/head'
import { useAppContext } from '../contexts/AppContext';
import dynamic from 'next/dynamic'
const PrettyIndexWithCustomLoading = dynamic(
  () => import('../components/PrettyIndex'),
  {
    loading: () => <Spinner />,
  }
)

export default function Home() {

  const { variableState } = useAppContext();

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
    <Flex h={{ base: "92vh", md: "92vh", lg: "92vh" }} backgroundColor={variableState ? "#1A202C" : "F7FAFC"} flexDirection="column" justifyContent="space-between" alignContent="center" alignItems="center">
      <Heading textAlign="center" color={variableState ? "white" : "black"} fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}>Para comenzar busca un municipio en la barra de arriba.</Heading>
      <Flex maxH="20rem" h="20rem" maxW="90vw" w="90vw" justifyContent="center" alignContent="center" alignItems="center">
        <PrettyIndexWithCustomLoading />
      </ Flex>
      <Stack marginBottom={{ base: "8rem", md: "0rem" }}>
        <Text as="kbd" textAlign="center" color={variableState ? "white" : "black"} fontSize={{ base: "lg", md: "xl" }}>Iconos creados por <Link color="teal.500" href="https://www.flaticon.com/authors/iconixar" isExternal>iconixar<ExternalLinkIcon mx="2px" /></Link></Text>
        <Text as="kbd" textAlign="center" color={variableState ? "white" : "black"} fontSize={{ base: "lg", md: "xl" }}>Datos obtenidos de <Link color="teal.500" href="http://www.aemet.es/es/portada" isExternal>AEMET<ExternalLinkIcon mx="2px" /></Link></Text>
        <Text as="kbd" textAlign="center" color={variableState ? "white" : "black"} fontSize={{ base: "lg", md: "xl" }}>UI creada con <Link color="teal.500" href="http://www.aemet.es/es/portada" isExternal>Chakra UI<ExternalLinkIcon mx="2px" /></Link> y <Link color="teal.500" href="https://nextjs.org/" isExternal>Next JS<ExternalLinkIcon mx="2px" /></Link></Text>
      </ Stack>
    </Flex>
  </>
  )
}
