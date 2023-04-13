import { useEffect, useState } from "react";
import { Community } from "@/atoms/communitiesAtom";
import React from "react";
import { auth, firestore } from "@/firebase/clientApp";
import { query, collection, where, getDocs, orderBy } from "firebase/firestore";
import usePosts from "@/hooks/usePosts";
import { Post } from "@/atoms/postsAtoms";
import PostItem from "./PostItem";
import { useAuthState } from "react-firebase-hooks/auth";
import { Stack } from "@chakra-ui/react";

type PostsProps = {
  communityData: Community;
};

const Posts: React.FC<PostsProps> = ({ communityData }) => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const {
    postStateValue,
    setPostStateValue,
    onVote,
    onSelectPost,
    onDeletePost,
  } = usePosts();

  const getPosts = async () => {
    try {
      const postQuery = query(
        collection(firestore, "posts"),
        where("communityId", "==", communityData.id),
        orderBy("createdAt", "desc")
      );
      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      setPostStateValue((prev: any) => ({
        ...prev,
        posts: posts as Post[],
      }));

      console.log("posts", posts);
    } catch (error: any) {
      console.log("GetPostsError", error.message);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Stack>
      {postStateValue.posts.map((item) => (
        <PostItem
          post={item}
          userIdCreator={user?.uid === item.creatorId}
          userVoteValue={undefined}
          onVote={onVote}
          onSelectPost={onSelectPost}
          onDeletePost={onDeletePost}
        />
      ))}
    </Stack>
  );
};

export default Posts;
