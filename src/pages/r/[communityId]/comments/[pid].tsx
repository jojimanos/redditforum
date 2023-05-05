import PageContent from "@/chakra/components/Layout/PageContent";
import PostItem from "@/chakra/components/posts/PostItem";
import { auth } from "@/firebase/clientApp";
import usePosts from "@/hooks/usePosts";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const PostPage: React.FC = () => {
  const { postStateValue, setPostStateValue, onDeletePost, onVote } =
    usePosts();
  const [user] = useAuthState(auth);

  return (
    <PageContent>
      <>
        {postStateValue.selectedPost && (
          <PostItem
            post={postStateValue.selectedPost}
            onVote={onVote}
            onDeletePost={onDeletePost}
            userVoteValue={
              postStateValue.postVotes.find(
                (item) => item.postId === postStateValue.selectedPost?.id
              )?.voteValue
            }
            userIdCreator={user?.uid === postStateValue.selectedPost.creatorId}
          />
        )}
      </>
      <></>
    </PageContent>
  );
};

export default PostPage;
