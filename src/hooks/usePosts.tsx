import { Post, PostVote, postState } from "@/atoms/postsAtoms";
import { auth, firestore, storage } from "@/firebase/clientApp";
import { collection, deleteDoc, doc, writeBatch } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";

const usePosts = () => {
  const [user] = useAuthState(auth);
  const [postStateValue, setPostStateValue] = useRecoilState(postState);

  const onVote = async (post: Post, vote: number, communityId: string) => {
    // check for a user => if not, open auth modal

    try {
      const { voteStatus } = post;
      const existingVote = postStateValue.postVotes.find(
        (vote) => vote.postId === post.id
      );

      const batch = writeBatch(firestore);
      const updatedPost = { ...post };
      const updatedPosts = [...postStateValue.posts];
      let updatedPostVotes = [...postStateValue.postVotes];
      let voteChange = vote;

      if (!existingVote) {
        //create a new postVote document
        const postVoteRef = doc(
          collection(firestore, "users", `${user?.uid}/postVotes`)
        );

        const newVote: PostVote = {
          id: postVoteRef.id,
          postId: post.id!,
          communityId,
          voteValue: vote, // 1 or -1
        };

        batch.set(postVoteRef, newVote);
      }
      
      updatedPost.voteStatus = voteStatus + vote
      updatedPostVotes = [...updatedPostVotes, newVote]

    }
      else {
        if (removingVote) {
          //removing their note (up => neutral or down => neutral)
          //delete the post vote document
        } else {
          //flipping their vote (up => down, down => up)
          //updating the existing postVote document
        }
      }
    } catch (error: any) {
      console.log("Vote", error.message);
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
