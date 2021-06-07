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
import { useState, createContext } from 'react';

const useStore = create((set) => ({
    darkMode: false,
    setDarkMode: () => set(state => ({ darkMode: !state.darkMode }))
}))


export default function Header() {

    const darkMode = useStore(state => state.darkMode); // TODO: https://github.com/pmndrs/zustand Aprende a usarlo
    const changeDarkMode = useStore(state => state.changeDarkMode)

    return (
        <nav className={styles.navbar}>
            <Flex minH="8vh" className={styles.flex_apply} flexDirection="row" justifyContent="space-between" alignItems="center" alignContent="center" padding="0px 16px" >
                <Menu>
                    <Text fontSize="2xl" textAlign="center" className={styles.nav_title}>Aemet clean clone</Text>
                    <InputGroup justifyContent="center">
                        <Input className={styles.nav_search} placeholder="Busca un municipio" colorScheme="facebook" />
                        <InputRightAddon children={<SearchIcon />} as={Button} onClick={() => { console.log("search") }} to="/" />
                    </InputGroup>
                    <MenuButton className={styles.nav_button} as={Button} onClick={changeDarkMode}>
                        {darkMode ? <MoonIcon /> : <SunIcon />}
                    </MenuButton>
                </Menu>
            </Flex>
        </nav >
    );
}