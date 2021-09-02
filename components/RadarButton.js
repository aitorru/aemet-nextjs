import {
    Text,
    Badge,
    Button,
    Popover,
    PopoverTrigger,
    Portal,
    PopoverContent,
    PopoverArrow,
    PopoverBody,
    Image,
    Spinner,
    Flex
} from "@chakra-ui/react"
import {
    Icon
} from '@chakra-ui/icons'
import { useState, useEffect } from 'react'
import styles from '../styles/Radar.module.css';

export default function RadarButton() {

    const [url, setUrl] = useState("none");

    const getImageFromAPI = async () => {
        fetch('/api/radar')
            .then(response => response.json())
            .then(data => setUrl(data.img))
    }

    useEffect(() => {
        getImageFromAPI();
    }, []);

    const IMAGE = () => {
        if (!(url === "none")) {
            return <Image src={url} alt="Radar de tiempo" />
        } else {
            return (<Flex w="100%" alignItems="center" justifyContent="center"><Spinner /></Flex>

            )
        }
    }

    return (

        <Text>
            <Popover>
                <PopoverTrigger>
                    <Badge h="1.5rem" ml="1" fontSize="0.8em" colorScheme="red" as={Button}>
                        Radar de lluvia
                        <Icon viewBox="0 0 200 200" color="red.500">
                            <path
                                fill="currentColor"
                                d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                                className={styles.radar}
                            />
                        </Icon>
                    </Badge>
                </PopoverTrigger>
                <Portal>
                    <PopoverContent>
                        <PopoverArrow />
                        <PopoverBody>
                            <IMAGE />
                        </PopoverBody>
                    </PopoverContent>
                </Portal>
            </Popover>

        </Text>
    )
}