import { auth } from "@/firebase/clientApp";
import { Flex, Image } from "@chakra-ui/react";
import React, { useDebugValue } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import SearchInput from "../Navbar/Searchinput";
import { RightContent } from "./RightContent/RightContent";
import Directory from "./Directory/Directory";
import useDirectory from "@/hooks/useDirectory";
import { defaultMenuItem } from "@/atoms/directoryMenuAtom";

const Navbar: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const { onSelectMenuItem } = useDirectory();
  return (
    <Flex
      flexGrow={1}
      bg="white"
      height="44px"
      padding="6px 12px"
      justify={{ md: "space-between" }}
    >
      <Flex
        align="center"
        width={{ base: "40px", md: "auto" }}
        mr={{ base: 0, md: 2 }}
        cursor="pointer"
        onClick={() => onSelectMenuItem(defaultMenuItem)}
      >
        <Image src="/images/reddit.png" alt="" height={10} width={10} />
        <Image
          src="/images/logo.png"
          alt="reddit"
          height={10}
          width={10}
          display={{ base: "none", md: "unset" }}
        />
      </Flex>
      {user && <Directory />}
      <SearchInput user={user} />
      <RightContent user={user} />
    </Flex>
  );
};
export default Navbar;
