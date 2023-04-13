import { firestore } from "@/firebase/clientApp";
import { Flex } from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Community } from "@/atoms/communitiesAtom";
import safeJsonStringify from "safe-json-stringify";
import Header from "@/chakra/components/Community/Header";
import PageContent from "@/chakra/components/Layout/PageContent";
import CreatePostLink from "@/chakra/components/Community/CreatePostLink";
import Posts from "@/chakra/components/posts/Posts";

type CommunityPageProps = {
  communityData: Community;
};

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {
  if (!communityData) {
    return <div>Not Found</div>;
  }

  return (
    <>
      <Header communityData={communityData} />
      <PageContent>
        <>
          <CreatePostLink />
          <Posts communityData={communityData} />
        </>
        <>
          <div>RHS</div>
        </>
      </PageContent>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const communityDocRef = doc(
      firestore,
      "communities",
      context.query.communityId as string
    );
    const communityDoc = await getDoc(communityDocRef);

    return {
      props: {
        communityData: communityDoc.exists()
          ? JSON.parse(
              safeJsonStringify({ id: communityDoc.id, ...communityDoc.data })
            )
          : "",
      },
    };
  } catch (error) {
    //could add error page here
    console.log("getServerSideProps error", error);
  }
}

export default CommunityPage;
