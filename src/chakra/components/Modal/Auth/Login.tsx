import { AuthModalState } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/clientApp";
import { FIREBASE_ERRORS } from "@/firebase/errors";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";

type LoginProps = {

};

export const Login:React.FC<LoginProps> = () => {
    const setAuthModalState = useSetRecoilState(AuthModalState);
    const [loginForm, setLoginForm] = useState({email: '', password: ''});

    const [
  signInWithEmailAndPassword,
  user,
  loading,
  error,
] = useSignInWithEmailAndPassword(auth);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        signInWithEmailAndPassword(loginForm.email, loginForm.password)
    };

    const onChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setLoginForm(prev => ({
            ...prev,
            [event.target.name]: event.target.value,
    }))
    };

    return (
        <form onSubmit={onSubmit}>
            <Input name="email" placeholder="email" type="email" mb={2} onChange={onChange}/>
            <Input name="password" placeholder="password" type="password" onChange={onChange}/>
            <Button width="100%" height="36px" type="submit" mt={2} mb={2}>Log In</Button>
            {(error) && <Text textAlign="center" color="red" fontSize="submit">
            {FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}
            </Text>}
            <Flex fontSize="9pt" justifyContent="center">
                <Text mr={1}>New Here?</Text>
                <Text color="blue.500" fontWeight={700} cursor="pointer" onClick={() => setAuthModalState((prev) => ({
                    ...prev,
                    view: "signup"
                }))
                }>SIGN UP</Text>
                </Flex>
        </form>
    )
}