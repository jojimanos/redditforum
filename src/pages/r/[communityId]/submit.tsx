import PageContent from "@/chakra/components/Layout/PageContent";
import { Flex, Box, Text } from "@chakra-ui/react";
import NewPostForm from "../../../chakra/components/posts/NewPostForm";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import { useRecoilState } from "recoil";
import { communityState } from "@/atoms/communitiesAtom";

const SubmitPostPage: React.FC = () => {
  const [user] = useAuthState(auth);
  const communityStateValue = useRecoilState(communityState);
  console.log("COMMUNITY", communityStateValue);
  return (
    <PageContent>
      <>
        <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
          <Text>Create a Post</Text>
        </Box>
        {user && <NewPostForm user={user} />}
      </>
      <>{/*About*/}</>
    </PageContent>
  );
};

export default SubmitPostPage;
