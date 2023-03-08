import { Flex, Button, Image, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../../../firebase/clientApp";

export const OAuthButtons: React.FC = () => {
  const [signInWithGoogle, userCred, loading, error] =
    useSignInWithGoogle(auth);

  const createUserDocument = async (user: User) => {
    const userDocRef = doc(firestore, "users", user.uid);

    await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));
  };

  return (
    <Flex direction="column" width="100%" mb={4}>
      <Button
        variant="oauth"
        mb={2}
        isLoading={loading}
        onClick={() => signInWithGoogle()}
      >
        <Image src="/images/google.png" alt="" height={5} width={5} />
        Continue with Google
      </Button>
      <Button variant="oauth">Some Other Provider</Button>
      {error && <Text>{error.message}</Text>}
    </Flex>
  );
};
