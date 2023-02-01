import { Flex, Button, Image, Text } from "@chakra-ui/react";
import React from "react";
import {useSignInWithGoogle} from 'react-firebase-hooks/auth';
import {auth} from "../../../../firebase/clientApp";

export const OAuthButtons:React.FC = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    return (
        <Flex direction="column" width="100%" mb={4}>
            <Button variant="oauth" mb={2} isLoading={loading} onClick={() => signInWithGoogle()}>
            <Image src="/images/google.png" alt="" height={5} width={5}/>
                Continue with Google</Button>
            <Button variant="oauth">Some Other Provider</Button>
            {error && <Text>{error.message}</Text>}
        </Flex>
    )
}