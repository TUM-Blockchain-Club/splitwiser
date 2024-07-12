"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Group, addGroup } from "../../../services/groupService";
import { HeartIcon, HomeIcon, PaperPlaneIcon } from "@radix-ui/react-icons";

interface CreateGroupProps {
  onGroupCreated?: (group: Group) => void;
}

export default function CreateGroup({ onGroupCreated }: CreateGroupProps) {
  const [groupName, setGroupName] = useState("");
  const [groupType, setGroupType] = useState("Trip");
  const router = useRouter();

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    try {
      const newGroup = await addGroup({ name: groupName, type: groupType });
      if (onGroupCreated) {
        onGroupCreated(newGroup);
      }
      router.push(`/groups/${newGroup.id}`); // Redirect to groups page after successful creation
    } catch (error) {
      console.error("Failed to create group", error);
      // You might want to show an error message to the user here
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4 max-w-md mx-auto">
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
              onClick={() => setGroupType(label as Group["type"])}
              className={`btn btn-outline ${groupType === label ? "btn-active" : ""}`}
            >
              <Icon size={16} />
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
