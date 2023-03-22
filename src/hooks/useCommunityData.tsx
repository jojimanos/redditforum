import {
  Community,
  CommunitySnippet,
  communityState,
} from "@/atoms/communitiesAtom";
import React from "react";
import { useRecoilState } from "recoil";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/firebase/clientApp";
import { collection, getDocs } from "firebase/firestore";

const useCommunityData = () => {
  const [user] = useAuthState(auth);
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onJoinOrLeaveCommunity = (
    communityData: Community,
    isJoined: boolean
  ) => {
    //is the user signedIn
    //if not => open auth modal

    if (isJoined) {
      leavedCommunity(communityData.id);
    }
    joinCommunity(communityData);
  };

  const getMySnippets = async () => {
    setLoading(true);
    try {
      const snippetDocs = await getDocs(
        collection(firestore, `users/${user?.uid}/communitySnippets`)
      );
      const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }));
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: snippets as CommunitySnippet[],
      }));
    } catch (error) {
      console.log("get my snippets error", error);
    }
  };

  const joinCommunity = (communityData: Community) => {};

  const leavedCommunity = (community: String) => {};

  useEffect(() => {
    if (!user) return;
    getMySnippets();
  }, [user]);

  return { communityStateValue, onJoinOrLeaveCommunity };
};

export default useCommunityData;
