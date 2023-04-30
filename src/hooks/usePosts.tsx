import { Post, postState } from "@/atoms/postsAtoms";
import { firestore, storage } from "@/firebase/clientApp";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React from "react";
import { useRecoilState } from "recoil";

const usePosts = () => {
  const [postStateValue, setPostStateValue] = useRecoilState(postState);

  const onVote = async (post: Post, vote: number, communityId: string) => {
    if (newVote) {
      //add/subtract 1 to/from post.voteStatus
      //create a new postVote document
    }
    // in case of existing vote
    else {
      if (removingVote) {
        //removing their note (up => neuteral or down => neutral)
        //delete the post vote document
      } else {
        //flipping their vote (up => down, down => up)
        //updating the existing postVote document
      }
    }
  };

  const onSelectPost = () => {};

  const onDeletePost = async (post: Post): Promise<boolean> => {
    try {
      if (post.imageURL) {
        const imageRef = ref(storage, `posts/${post.id}/image`);
        await deleteObject(imageRef);

        const postDocRef = doc(firestore, "posts", post.id!);
        await deleteDoc(postDocRef);
      }

      setPostStateValue((prev) => ({
        ...prev,
        posts: prev.posts.filter((item) => item.id !== post.id),
      }));
      return true;
    } catch (error) {
      return false;
    }
  };
  return {
    postStateValue,
    setPostStateValue,
    onVote,
    onSelectPost,
    onDeletePost,
  };
};

export default usePosts;
