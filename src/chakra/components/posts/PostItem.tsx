import React from "react";
import {
  Flex,
  Icon,
  Image,
  Skeleton,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { NextRouter } from "next/router";
import { AiOutlineDelete } from "react-icons/ai";
import { BsChat, BsDot } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBookmarkOutline,
} from "react-icons/io5";
import Link from "next/link";
import { Post } from "@/atoms/postsAtoms";
import moment from "moment";

type PostItemsProps = {
  post: Post;
  userIdCreator: boolean;
  userVoteValue: number;
  onVote: () => {};
  onDeletePost: () => {};
  onSelectPost: () => void;
};

const PostItem: React.FC<PostItemsProps> = ({
  post,
  userIdCreator,
  userVoteValue,
  onVote,
  onDeletePost,
  onSelectPost,
}) => {
  return (
    <Flex
      border="1px solid"
      bg="white"
      borderColor="gray.300"
      borderRadius={4}
      _hover={{ border: "gray.500" }}
      cursor="pointer"
      onClick={onSelectPost}
    >
      <Flex
        direction="column"
        align="center"
        bg="gray.100"
        p={2}
        width="40px"
        borderRadius={4}
      ></Flex>
      <Icon
        as={
          userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowDownCircleOutline
        }
        color={userVoteValue === 1 ? "brand.100" : "gray.400"}
      />
      <Flex direction="column" width="100%">
        <Stack spacing={1} p="10px">
          <Stack direction="row" spacing={0.6} align="center" fontSize="9pt">
            <Text>
              Posted by u/{post.creatorDisplayName}{" "}
              {moment(new Date(post.createdAt?.seconds * 1000)).fromNow()}
            </Text>
          </Stack>
          <Text fontSize="12pt" fontWeight={600}>
            {post.title}
          </Text>
          <Text fontSize="10pt">{post.body}</Text>
          {post.imageURL && (
            <Flex justify="counter" align="center" p={2}>
              <Image src={post.imageURL} maxHeight="460px" alt="Post Image" />
            </Flex>
          )}
        </Stack>
        <Flex ml={1} mb={0.5} color="gray.500" fontWeight={600}>
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.700" }}
            cursor="pointer:w
            "
          >
            <Icon as={BsChat} mr={2} />
            <Text fontSize="9pt">{post.numberOfComments}</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PostItem;
