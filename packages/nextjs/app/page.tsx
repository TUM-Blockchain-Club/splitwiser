"use client";

import Link from "next/link";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import type { NextPage } from "next";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const { primaryWallet } = useDynamicContext();
  const connectedAddress = primaryWallet?.address;

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">SplitWiser</span>
          </h1>
          <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row">
            <p className="my-2 font-medium">Connected Address:</p>
            <Address address={connectedAddress} />
          </div>
          {primaryWallet && (
            <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row">
              <Link href="/addgroup" passHref>
                <button className="btn btn-primary">Start a Group</button>
              </Link>
              <button className="btn btn-primary">Add an Expense</button>
              <button className="btn btn-primary">Settle Up</button>
            </div>
          )}
          {/* {primaryWallet && messageSignature && (
            <p className="text-center-text-lg">Message signed! {messageSignature}</p>
          )}
          {primaryWallet && transactionSignature && (
            <p className="text-center-text-lg">Transaction processed! {transactionSignature}</p>
          )} */}
          <p className="text-center text-lg">Get started by adding friends to your group and splitting expenses.</p>
          <p className="text-center text-lg">Check your balance and settle up with your friends.</p>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <BugAntIcon className="h-8 w-8 fill-secondary" />
              <p>
                <Link href="/activity" passHref className="link">
                  Recent Activities
                </Link>{" "}
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
              <p>
                <Link href="/blockexplorer" passHref className="link">
                  Add Friends on SplitWiser
                </Link>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
