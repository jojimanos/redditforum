import { Community, communityState } from "@/atoms/communitiesAtom";
import { Flex, Box, Icon, Image, Text, Button } from "@chakra-ui/react";
import { FaReddit } from "react-icons/fa";
import useCommunityData from "../../../hooks/useCommunityData";

interface CommunityHeaderProps {
  communityData: Community;
}

const Header: React.FC<CommunityHeaderProps> = ({ communityData }) => {
  const { communityStateValue, onJoinOrLeaveCommunity } = useCommunityData();
  const isJoined = !!communityStateValue.mySnippets.find(
    (item) => item.communityId === communityData.id
  );
  return (
    <Flex direction="column" width="100%" height="140px">
      <Box height="50%" bg="blue.400" />
      <Flex justify="center" bg="white" flexGrow={1}>
        <Flex width="95%" maxWidth="860px">
          {communityData.imageURL ? (
            <Image src="" alt="" />
          ) : (
            <Icon
              as={FaReddit}
              fontSize={64}
              position="relative"
              top={-3}
              color="blue.500"
              border="4px solid white"
              borderRadius="50%"
            />
          )}
          <Flex padding="10px 16px">
            <Flex direction="column" mr={6}>
              <Text fontWeight={500} fontSize="16pt">
                {communityData.id}
              </Text>
              <Text fontWeight={600} fontSize="10pt" color="gray.400">
                r/{communityData.id}
              </Text>
            </Flex>
            <Button
              variant={isJoined ? "outline" : "solid"}
              height="30px"
              pr={6}
              pl={6}
              onClick={() => onJoinOrLeaveCommunity(communityData, isJoined)}
            >
              {isJoined ? "Joined" : "Join"}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Header;
