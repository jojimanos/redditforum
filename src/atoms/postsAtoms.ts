import {atom} from "recoil";
import {TimeStamp} from "firebase/firestore";

export type Post = {
  id: string;
  communityId: string;
  creatorId: string;
  creatorDisplayName: string;
  title: string;
  body: string;
  numberOfComments: number;
  voteStatus: number;
  imageURL?: string;
  communityImageURL?: string;
  createdAt: TimeStamp;
}

interface PostState {
selectedPost: Post | null;
  posts: Post[];
  // postVotes:
}

const defaultPostState: PostState = {
  selectedPost: null,
  posts: [];
} 

export const postState = atom<PostState>{
  key: 'postState',
  default: 'defaultPostState'
}