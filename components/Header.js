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
    useToast,
} from "@chakra-ui/react"
import {
    SearchIcon,
    SunIcon,
    MoonIcon
} from '@chakra-ui/icons'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react';
import municipios from '../public/municipios/aemetdata.json'
var _ = require('lodash');


export default function Header() {

    const [darkMode, changeDarkMode] = useState(false);
    const router = useRouter();
    const [value, setValue] = useState("");
    const handleChange = (event) => setValue(event.target.value);
    const toast = useToast();

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleMunicipioSearch();
        }
    }

    const handleMunicipioSearch = () => {
        var url = _.find(municipios,
            (o) => {
                return (_.lowerCase(o.name) == _.lowerCase(value) || _.lowerCase(o.name.split(' ')[_.findIndex(o.name.split(' '), (d) => { _.lowerCase(d) == _.lowerCase(value) })]) == _.lowerCase(value))
            }
        )?.id;
        if (!(url == null)) {
            router.push(`/municipios/${url}`);
        } else {
            toast({ title: "No se ha encontrado el municipio.", status: "error", duration: 9000, isClosable: true, });
        }
    }

    return (
        <nav className={styles.navbar}>
            <Flex minH="8vh" className={styles.flex_apply} flexDirection="row" justifyContent="space-between" alignItems="center" alignContent="center" padding="0px 16px" >
                <Menu>
                    <Link href="/" passHref><Text margin="1" paddingLeft="26" paddingRight="26" fontSize={{ base: "xs", md: "md", lg: "xl" }} textAlign="center" as={Button} variant="link" className={styles.nav_title}>Aemet clean clone</Text></Link>
                    <InputGroup justifyContent="center">
                        <Input className={styles.nav_search} value={value} onKeyPress={(e) => { handleKeyPress(e) }} onChange={handleChange} placeholder="Busca un municipio" colorScheme="facebook" />
                        <InputRightAddon children={<SearchIcon />} as={Button} onClick={(e) => { e.preventDefault(); handleMunicipioSearch() }} />
                    </InputGroup>
                    <MenuButton className={styles.nav_button} as={Button} margin="1" paddingLeft="-10" paddingRight="-10" onClick={() => { changeDarkMode(!darkMode) }}>
                        {darkMode ? <MoonIcon /> : <SunIcon />}
                    </MenuButton>
                </Menu>
            </Flex>
        </nav >
    );
}