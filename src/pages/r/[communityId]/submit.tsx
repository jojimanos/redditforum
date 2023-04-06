import PageContent from "@/chakra/components/Layout/PageContent";
import { Flex, Box, Text } from "@chakra-ui/react";
import NewPostForm from "../../../chakra/components/posts/NewPostForm.tsx";
import {useAuthState} from "react-firebase-hooks/auth"
import {auth} from '../../../firebase/clientApp'

const SubmitPostPage: React.FC = () => {
  const [user] = useAuthState(auth)
  return (
    <PageContent>
      <>
        <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
          <Text>Create a Post</Text>
        </Box>
        <NewPostForm user={user}/>
      </>
      <>{/*About*/}</>
    </PageContent>
  );
};

export default SubmitPostPage;
