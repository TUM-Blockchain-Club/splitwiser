"use client";

// components/FriendsList.tsx
import React from "react";
import { Friend } from "~~/types/app";

interface FriendsListProps {
  friends: Friend[];
  onDelete: (id: string) => void;
}

const FriendsList: React.FC<FriendsListProps> = ({ friends, onDelete }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold">Friends List</h2>
      {friends.length === 0 ? (
        <p className="mt-4 text-gray-500">No friends added yet.</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {friends.map(friend => (
            <li key={friend.id} className="flex justify-between items-center bg-white p-3 rounded shadow">
              <div>
                <strong>{friend.name}</strong>
                <p className="text-sm text-gray-600">{friend.address}</p>
              </div>
              <button onClick={() => onDelete(friend.id)} className="btn btn-sm btn-error">
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FriendsList;
