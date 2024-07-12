import { Activities } from "./_components/DebugContracts";
import type { NextPage } from "next";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Recent Activities",
  description: "Find all your recent activities here",
});

const Activity: NextPage = () => {
  return (
    <>
      <Activities />
      <div className="text-center mt-8 bg-secondary p-10">
        <h1 className="text-4xl my-0">Recent Activities</h1>
        <p className="text-neutral">
          You can see all your recent activities here.
          <br /> Check{" "}
          <code className="italic bg-base-300 text-base font-bold [word-spacing:-0.5rem] px-1">
            packages / nextjs / app / debug / page.tsx
          </code>{" "}
        </p>
      </div>
    </>
  );
};

export default Activity;
