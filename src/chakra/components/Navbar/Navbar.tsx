import { Flex,Image } from "@chakra-ui/react";
import React from "react";
import SearchInput from '../Navbar/Searchinput'
import { RightContent } from "./RightContent/RightContent";

const Navbar:React.FC = () => {
    return (
    <Flex bg="white" height="44px" padding="6px 12px">
        <Flex align="center">
            <Image src="/images/crux.png" alt="" height={10} width={10}/>
            <Image src="/images/worried.png" alt="" height={10} width={10} display={{base: "none", md: "unset"}}/>
        </Flex>
            <SearchInput/>
        <RightContent/>
    </Flex>
        )
};
export default Navbar;