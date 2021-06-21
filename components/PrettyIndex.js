import {
    Text,
    Kbd,
} from "@chakra-ui/react"
import municipios from '../public/municipios/aemetdata.json'
import { useState, useEffect } from 'react'
var _ = require('lodash');
import TextTransition, { presets } from "react-text-transition";
import { useAppContext } from '../contexts/AppContext';

export default function PrettyIndex() {
    const [municipio_rand, setMunicipio_rand] = useState(municipios[_.random(0, municipios.length)].name);

    const { variableState } = useAppContext();

    useEffect(() => {
        const interval = setInterval(() => {
            setMunicipio_rand(municipios[_.random(0, municipios.length)]?.name);
        }, 1800);
        return () => clearInterval(interval);
    }, []);

    return (
        <Text textAlign="center" color={variableState ? "white" : "black"} fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}>
            Escribe "<TextTransition inline={true} delay={100} text={_.capitalize(municipio_rand)} springConfig={presets.gentle} />" y pulsa <Kbd backgroundColor={variableState ? "#1A202C" : "F7FAFC"}>Intro</Kbd>
        </Text>
    )
}