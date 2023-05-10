import { Post } from "@/atoms/postsAtoms";
import { Box } from "@chakra-ui/react";
import { User } from "firebase/auth";
import React, { useEffect } from "react";

type CommentsProps = {
  user: User;
  selectedPost: Post;
  communityId: string;
};

const Comments: React.FC<CommentsProps> = ({
  user,
  selectedPost,
  communityId,
}) => {
  const onCreateComment = async (commentText: string) => {};

  const onDeleteComment = async (comment: any) => {};

  const getPostComments = async () => {};

  useEffect(() => {
    getPostComments();
  }, []);

  return (
    <Box bg="white" borderRadius="0px 0px 4px 4px">
      Here are comments
    </Box>
  );
};

export default Comments;
