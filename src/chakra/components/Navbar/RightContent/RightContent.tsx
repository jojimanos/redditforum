import { Flex } from "@chakra-ui/react";
import React from "react";
import AuthModal from "../../Modal/Auth/AuthModel";
import { AuthButtons } from "./AuthButtons";

type RightContentProps = {

};

export const RightContent:React.FC<RightContentProps> = () => {
    return <Flex justify="center" align="center">
        <AuthModal/>
        <AuthButtons/>
    </Flex>
};