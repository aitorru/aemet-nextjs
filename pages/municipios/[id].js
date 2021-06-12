import styles from '../../styles/Home.module.css'
import {
  Flex,
  Text,
  Skeleton,
  Stack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Grid,
  GridItem,
  Divider,
  useToast,
  Heading,
  Fade,
  ScaleFade,
  Slide,
  SlideFade
} from "@chakra-ui/react"
import {
} from '@chakra-ui/icons'
import useSWR from 'swr'
import Head from 'next/head'
import {
  Line,
  Bar
} from 'react-chartjs-2';
import InconoTiempo from '../../components/IconoTiempo';
import Nube from '../../public/weather/001-cloud.svg'
import Termometro from '../../public/weather/043-warm.svg'
import Paragüas from '../../public/weather/048-umbrella.svg'
import Gota from '../../public/weather/028-drop.svg'
import { useState } from 'react'
import municipios from '../../public/municipios/aemetdata.json'
import { useAppContext } from '../../contexts/AppContext';
import axios from 'axios'
var _ = require('lodash');

export default function Home({ municipio }) {
  const toast_actualizado = useToast();

  const { variableState, setVariableState } = useAppContext();

  const fetcher_toast = (url, token) =>
    axios
      .get(url, { headers: { municipio: token } })
      .then((res) => res.data)
      .finally(() => toast_actualizado({
        title: "Se han actualizado los datos",
        status: "success",
        duration: 5000,
        isClosable: true,
      }))
  const fetcher = (url, token) =>
    axios
      .get(url, { headers: { municipio: token } })
      .then((res) => res.data)

  const [tormenta, setTormenta] = useState(false);
  const [prb_tormenta, setPrb_tormenta] = useState(0);

  function maxmin() {
    const { data, error } = useSWR(['/api/maxmin', municipio.id], fetcher);
    return {
      plot_data: data,
      plot_loading: !error && !data,
      plot_error: error
    }
  }

  const { plot_data, plot_loading, plot_error } = maxmin();

  function current() {
    const { data, error } = useSWR(['/api/current', municipio.id], fetcher_toast);
    return {
      current_data: data,
      current_loading: !error && !data,
      current_error: error
    }
  }

  const { current_data, current_loading, current_error } = current();

  const options = {
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  const SUMMARY = () => {
    if (current_loading) {
      return (
        <Box w="80vw" h="50vh">
          <Stack>
            <Skeleton height="2vh" />
            <Skeleton height="2vh" />
            <Skeleton height="2vh" />
            <Skeleton height="2vh" />
          </Stack>
        </Box>
      );
    } else if (current_error) {
      return (
        <Box display="inline" className={styles.plot} w="100%" h="20rem">
          <Alert
            status="error"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            w="100%"
            h="20rem"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              No se pudo obtener los datos de AEMET
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              Nuestros servidores estan teniendo problemas. Intentelo mas tarde.
            </AlertDescription>
          </Alert>
        </Box>
      )
    } else {
      if (current_data['prob_tormenta']['#text'] > 0) {
        setTormenta(true);
        setPrb_tormenta(current_data['prob_tormenta']['#text']);
      }
      return (
        <Box display="inline" w="90vw" h="20rem">
          <Grid
            h="17rem"
            templateRows="repeat(3, 1fr)"
            templateColumns="repeat(3, 1fr)"
            gap={2}
            paddingTop="3rem"
          >
            <GridItem rowSpan={3} colSpan={1} ><InconoTiempo id={current_data['cielo']['#text']} className={styles.icono} /></GridItem>
            <GridItem colSpan={2} bg="#FED7D7">
              <Flex flexDirection="row" justifyContent="space-around" alignItems="center" alignContent="center" h="100%" w="100%">
                <Nube className={styles.icono_text} /><Text fontSize="xl">{current_data['cielo']['attr']['@_descripcion']}</Text>
              </Flex>
            </ GridItem>
            <GridItem colSpan={1} bg="#FED7D7">
              <Flex flexDirection="row" justifyContent="space-around" alignItems="center" alignContent="center" h="100%" w="100%">
                <Termometro className={styles.icono_text} /><Text fontSize="xl">{current_data['temperatura']['#text']} ºC</Text>
              </Flex>
            </ GridItem>
            <GridItem colSpan={1} bg="#FED7D7">
              <Flex flexDirection="row" justifyContent="space-around" alignItems="center" alignContent="center" h="100%" w="100%">
                <Paragüas className={styles.icono_text} /><Text fontSize="xl">{current_data['prob_precipitacion']['#text']}%</Text>
              </Flex>
            </GridItem>
            <GridItem colSpan={2} bg="#FED7D7">
              <Flex flexDirection="row" justifyContent="space-around" alignItems="center" alignContent="center" h="100%" w="100%">
                <Gota className={styles.icono_text} /><Text fontSize="xl">{current_data['precipitacion']['#text']}ml</Text>
              </Flex>
            </GridItem>
          </Grid>
        </Box >

      )
    }

  }

  const PLOT_MAX_MIN = () => {

    if (plot_loading) {
      return (
        <Stack paddingTop="50px" maxH="20rem" h="20rem" maxW="90vw" w="90vw">
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      )
    } else if (plot_error) {
      return (
        <Box className={styles.plot} maxH="20rem" h="20rem" maxW="90vw" w="90vw">
          <Alert
            status="error"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              No se pudo obtener los datos de AEMET
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              Nuestros servidores estan teniendo problemas. Intentelo mas tarde.😔
            </AlertDescription>
          </Alert>
        </Box>


      )
    } else {
      return (
        <Box className={styles.plot} maxH="20rem" h="20rem" maxW="90vw" w="90vw">
          <Line width={200} height={50} data={plot_data['maxmin']} options={options} />
        </Box>
      );
    }
  }
  const PLOT_MAX_MIN_PREP = () => {

    if (plot_loading) {
      return (
        <Stack paddingTop="50px" maxH="20rem" h="20rem" maxW="90vw" w="90vw">
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      )
    } else if (plot_error) {
      return (
        <Box className={styles.plot} maxH="20rem" h="20rem" maxW="90vw" w="90vw">
          <Alert
            status="error"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              No se pudo obtener los datos de AEMET
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              Nuestros servidores estan teniendo problemas. Intentelo mas tarde.😔
            </AlertDescription>
          </Alert>
        </Box>


      )
    } else {
      return (
        <Box className={styles.plot} maxH="20rem" h="20rem" maxW="90vw" w="90vw">
          <Line width={200} height={50} data={plot_data['prep']} options={options} />
        </Box>
      );
    }
  }

  const PLOT_TEMP_DAY = () => {

    if (current_loading) {
      return (
        <Stack paddingTop="50px" maxH="20rem" h="20rem" maxW="90vw" w="90vw">
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      )
    } else if (current_error) {
      return (
        <Box className={styles.plot} maxH="20rem" h="20rem" maxW="90vw" w="90vw">
          <Alert
            status="error"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              No se pudo obtener los datos de AEMET
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              Nuestros servidores estan teniendo problemas. Intentelo mas tarde.😔
            </AlertDescription>
          </Alert>
        </Box>


      )
    } else {
      return (
        <Box className={styles.plot} maxH="20rem" h="20rem" maxW="90vw" w="90vw">
          <Line width={200} height={50} data={current_data['temperatura_stat']} options={options} />
        </Box>
      );
    }
  }


  const PLOT_PREP_DAY = () => {

    if (current_loading) {
      return (
        <Stack paddingTop="50px" maxH="20rem" h="20rem" maxW="90vw" w="90vw">
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      )
    } else if (current_error) {
      return (
        <Box className={styles.plot} maxH="20rem" h="20rem" maxW="90vw" w="90vw">
          <Alert
            status="error"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              No se pudo obtener los datos de AEMET
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              Nuestros servidores estan teniendo problemas. Intentelo mas tarde.😔
            </AlertDescription>
          </Alert>
        </Box>


      )
    } else {
      return (
        <Box className={styles.plot} maxH="20rem" h="20rem" maxW="90vw" w="90vw">
          <Bar width={200} height={50} data={current_data['precipitacion_stat']} options={options} />
        </Box>
      );
    }
  }


  return (<>
    <Head>
      <title>Tiempo en {_.capitalize(municipio.name)} - AEMET clean clone</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property="og:title" content={`Tiempo en ${_.capitalize(municipio.name)}, España previsión actualizada del tiempo. Temperaturas, probabilidad de lluvias - AEMET clean clone`} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://aemet-nextjs.vercel.app/" />
      <meta property="og:image" content="https://aemet-nextjs.vercel.app/sun.svg" />
      <meta property="og:description" content="Clon de AEMET con mayor limpieza" />
      <meta name="theme-color" content="#162b47" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="locality" content={`${_.capitalize(municipio.name)}, España`} />
      <meta name="og:description" content={`Tiempo en ${_.capitalize(municipio.name)}, España previsión actualizada del tiempo. Temperaturas, probabilidad de lluvias - AEMET clean clone`} />
      <meta name="twitter:description" content={`Tiempo en ${_.capitalize(municipio.name)}, España previsión actualizada del tiempo. Temperaturas, probabilidad de lluvias - AEMET clean clone`} />
    </Head>
    <Flex h="100%" className={styles.flex_apply} backgroundColor={variableState ? "#1A202C" : "F7FAFC"} flexDirection="column" justifyContent="center" alignContent="center" alignItems="center">
      {tormenta ? <Collapse in={isOpen} animateOpacity><Alert status="warning"><AlertIcon />Hay aviso de tormenta. Ten cuidado. Actualmente un {prb_tormenta}%</Alert><Divider /></Collapse> : null}
      <Heading textAlign="center" color={variableState ? "white" : "black"} fontSize="6xl">Datos de {_.capitalize(municipio.name)} - {new Date().getDate().toString()}/{new Date().getMonth() + 1}/{new Date().getFullYear().toString()}</Heading>
      <Divider />
      <SUMMARY />
      <Divider />
      <Text textAlign="center" color={variableState ? "white" : "black"} fontSize="4xl">Predicciones del dia</Text>
      <Text textAlign="center" color={variableState ? "white" : "black"} fontSize="2xl">Temperatura del dia</Text>
      <PLOT_TEMP_DAY />
      <Divider />
      <Text textAlign="center" color={variableState ? "white" : "black"} fontSize="2xl">Precipitaciones del dia</Text>
      <PLOT_PREP_DAY />
      <Divider />
      <Text textAlign="center" color={variableState ? "white" : "black"} fontSize="4xl">Predicciones de 7 dias</Text>
      <Text textAlign="center" color={variableState ? "white" : "black"} fontSize="2xl">Maxmimas y minimas</Text>
      <PLOT_MAX_MIN />
    </Flex>
  </>
  )
}


export async function getStaticProps({ params }) {
  for (var i in municipios) {
    if (municipios[i]['id'] == params.id) {
      var municipio = municipios[i];
      return {
        props: {
          municipio
        },
      }
    }
  }

}

export async function getStaticPaths() {
  var paths = [];
  for (var i in municipios) {
    paths.push({
      params: { id: municipios[i]['id'] }
    }
    )
  }
  return { paths, fallback: 'blocking' }
}