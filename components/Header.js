import styles from '../styles/Header.module.css';
import {
    Menu,
    MenuButton,
    Button,
    Flex,
    Text,
    Input,
    InputGroup,
    InputRightAddon,
} from "@chakra-ui/react"
import {
    SearchIcon,
    SunIcon,
    MoonIcon
} from '@chakra-ui/icons'
import create from 'zustand'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react';
import municipios from '../public/municipios/aemetdata.json'
var _ = require('lodash');

const useStore = create((set) => ({
    darkMode: false,
    setDarkMode: () => set(state => ({ darkMode: !state.darkMode }))
}))


export default function Header() {

    const darkMode = useStore(state => state.darkMode); // TODO: https://github.com/pmndrs/zustand Aprende a usarlo
    const changeDarkMode = useStore(state => state.changeDarkMode)
    const router = useRouter();
    const [value, setValue] = useState("");
    const handleChange = (event) => setValue(event.target.value)

    return (
        <nav className={styles.navbar}>
            <Flex minH="8vh" className={styles.flex_apply} flexDirection="row" justifyContent="space-between" alignItems="center" alignContent="center" padding="0px 16px" >
                <Menu>
                    <Link href="/" passHref><Text fontSize="2xl" textAlign="center" as={Button} className={styles.nav_title}>Aemet clean clone</Text></Link>
                    <InputGroup justifyContent="center">
                        <Input className={styles.nav_search} value={value} onChange={handleChange} placeholder="Busca un municipio" colorScheme="facebook" />
                        <InputRightAddon children={<SearchIcon />} as={Button} onClick={(e) => { e.preventDefault(); var url = _.find(municipios, (o) => { return (_.lowerCase(o.name) == _.lowerCase(value)) }).id; router.push(`/municipios/${url}`) }} />
                    </InputGroup>
                    <MenuButton className={styles.nav_button} as={Button} onClick={changeDarkMode}>
                        {darkMode ? <MoonIcon /> : <SunIcon />}
                    </MenuButton>
                </Menu>
            </Flex>
        </nav >
    );
}