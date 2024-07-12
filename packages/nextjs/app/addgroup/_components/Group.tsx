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
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Link href="/" passHref>
          <button className="btn btn-primary">Cancel</button>
        </Link>
        <h1 className="text-xl font-semibold">Create a group</h1>
        <button type="submit" className="btn btn-primary">
          Done
        </button>
      </div>

      <div className="mb-6">
        {/* <div className="border border-dashed border-gray-300 rounded-lg p-4 mb-2 flex items-center justify-center">
          <Camera className="text-gray-400" size={24} />
        </div> */}
        <input
          type="text"
          placeholder="Group name"
          value={groupName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGroupName(e.target.value)}
          className="w-full border-b border-gray-300 pb-2 focus:outline-none focus:border-green-500"
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
              className={`flex items-center space-x-1 px-4 py-2 rounded-full ${
                groupType === label ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"
              }`}
            >
              <Icon size={16} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </form>
  );
}
