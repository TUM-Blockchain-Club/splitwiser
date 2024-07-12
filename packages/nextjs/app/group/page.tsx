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
      <div className="text-center mt-8 bg-secondary p-10">
        <h1 className="text-4xl my-0">Add a Group</h1>
        <p className="text-neutral">You can add friends to your group and start splitting expenses.</p>
      </div>
    </>
  );
};

export default Group;
