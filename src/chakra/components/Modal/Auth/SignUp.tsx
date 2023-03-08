import { AuthModalState } from "@/atoms/authModalAtom";
import { Input, Button, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../../../firebase/clientApp";
import { FIREBASE_ERRORS } from "../../../../firebase/errors";
import { addDoc, collection } from "firebase/firestore";
import { User } from "firebase/auth";

type SignUpProps = {};

export const SignUp: React.FC<SignUpProps> = () => {
  const setAuthModalState = useSetRecoilState(AuthModalState);

  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formError, setFormError] = useState("");

  const [createUserWithEmailAndPassword, userCred, loading, userError] =
    useCreateUserWithEmailAndPassword(auth);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formError) setFormError("");
    if (signUpForm.password !== signUpForm.confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }
    createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const createUserDocument = async (user: User) => {
    await addDoc(
      collection(firestore, "users"),
      JSON.parse(JSON.stringify(user))
    );
  };

  useEffect(() => {
    if (userCred) {
      createUserDocument(userCred.user);
    }
  }, [userCred]);

  return (
    <form onSubmit={onSubmit}>
      <Input
        required
        name="email"
        placeholder="email"
        type="email"
        mb={2}
        onChange={onChange}
      />
      <Input
        required
        name="password"
        placeholder="password"
        type="password"
        mb={2}
        onChange={onChange}
      />
      <Input
        required
        name="confirmPassword"
        placeholder="confirm password"
        type="confirm password"
        onChange={onChange}
      />
      {(formError || userError) && (
        <Text textAlign="center" color="red" fontSize="submit">
          {formError ||
            FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}
        </Text>
      )}
      <Button
        width="100%"
        height="36px"
        type="submit"
        mt={2}
        mb={2}
        isLoading={loading}
      >
        Sign Up
      </Button>
      <Flex fontSize="9pt" justifyContent="center">
        <Text mr={1}>Already a user?</Text>
        <Text
          color="blue.500"
          fontWeight={700}
          cursor="pointer"
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: "login",
            }))
          }
        >
          LOG IN
        </Text>
      </Flex>
    </form>
  );
};
