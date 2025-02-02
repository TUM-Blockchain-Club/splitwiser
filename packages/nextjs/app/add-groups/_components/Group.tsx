"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { config } from "./config";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { HeartIcon, HomeIcon, PaperPlaneIcon } from "@radix-ui/react-icons";
import { getTransactionReceipt } from "@wagmi/core";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

export default function CreateGroup() {
  const [groupName, setGroupName] = useState("");
  const [groupType, setGroupType] = useState("Trip");
  const router = useRouter();

  const { primaryWallet } = useDynamicContext();
  const connectedAddress = primaryWallet?.address;

  let eurcSmartContractAddress = "0x808456652fdb597867f38412077A9182bf77359F"; // Default is EURC in Base Sepolia

  if (primaryWallet !== null) {
    switch (primaryWallet.network) {
      case 84532:
        eurcSmartContractAddress = "0x808456652fdb597867f38412077A9182bf77359F";
        break;
      case 1:
        eurcSmartContractAddress = "0x1aBaEA1f7C830bD89Acc67eC4af516284b1bC33c";
        break;
      case 11155111:
        eurcSmartContractAddress = "0x08210F9170F89Ab7658F0B5E3fF39b0E03C594D4";
        break;
    }
  }

  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract("Splitwiser");

  async function createGroupOnChain(): Promise<any> {
    try {
      if (!connectedAddress) {
        throw new Error("No wallet connected");
      } else {
        console.log("connectedAddress", connectedAddress);
        const result = await writeYourContractAsync({
          functionName: "createGroup",
          args: [groupName, [connectedAddress], eurcSmartContractAddress],
        });
        if (!result) {
          throw new Error("No result returned");
        } else {
          const trx = await getTransactionReceipt(config, { hash: result });
          console.log("Transaction Content", trx.logs[0].topics[1]);
          return trx.logs[0].topics[1];
        }
      }
    } catch (e) {
      console.error("Error setting greeting:", e);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!connectedAddress) {
      console.error("No wallet connected");
      return;
    }

    try {
      // Create the group on-chain and get the transaction result
      const txResult = await createGroupOnChain();
      console.log("txResult", txResult);

      // // Wait for the transaction to be mined and get the receipt
      // const receipt = await txResult.wait();

      const onChainGroupId = txResult;

      console.log("Group created on chain", txResult);

      const queryParams = new URLSearchParams({
        name: groupName,
        type: groupType,
        onChainId: onChainGroupId.toString(),
      }).toString();

      // Navigate to the new page
      router.push(`/groups/${onChainGroupId.toString()}?${queryParams}`);
    } catch (error) {
      console.error("Failed to create group", error);
      // You might want to show an error message to the user here
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4 max-w-md mx-3">
      <h1 className="text-3xl font-semibold">Create a group</h1>

      <div className="mb-6">
        {/* <div className="border border-dashed border-gray-300 rounded-lg p-4 mb-2 flex items-center justify-center">
          <Camera className="text-gray-400" size={24} />
        </div> */}
        <input
          type="text"
          placeholder="Group name"
          value={groupName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGroupName(e.target.value)}
          className="input input-bordered w-full max-w-xs"
          required
        />
      </div>

      <div className="mb-6">
        <h2 className="text-lg mb-2">Type</h2>
        <div className="flex space-x-2">
          {[
            { icon: PaperPlaneIcon, label: "Trip" },
            { icon: HomeIcon, label: "Home" },
            { icon: HeartIcon, label: "Couple" },
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              onClick={e => {
                e.preventDefault();
                setGroupType(label);
              }}
              role={"button"}
              className={`btn btn-outline ${groupType === label ? "btn-active" : ""}`}
            >
              <Icon fontSize={16} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-between items-center mb-6 space-x-2 space-y-2 pt-8">
        <Link href="/" passHref className={"w-full"}>
          <button className="btn btn-error w-full">Cancel</button>
        </Link>

        <button type="submit" className="btn btn-primary w-full">
          Create Group
        </button>
      </div>
    </form>
  );
}
