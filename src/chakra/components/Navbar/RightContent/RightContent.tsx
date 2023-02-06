import { auth } from "@/firebase/clientApp";
import { Button, Flex } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import React from "react";
import AuthModal from "../../Modal/Auth/AuthModal";
import { AuthButtons } from "./AuthButtons";

type RightContentProps = {
user: any;
};

export const RightContent:React.FC<RightContentProps> = ({user}) => {
    return <Flex justify="center" align="center">
        <AuthModal/>
        {user ? (<Button onClick={() => {signOut(auth)}}>Logout</Button>) : (<AuthButtons/>)}
    </Flex>
};