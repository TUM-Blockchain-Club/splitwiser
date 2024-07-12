// import { Groups } from "./_components/";
import CreateGroup from "./_components/Group";
import type { NextPage } from "next";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Create a Group",
  description: "Create a new group and invite your friends",
});

const Group: NextPage = () => {
  return (
    <>
      <CreateGroup />
    </>
  );
};

export default Group;
