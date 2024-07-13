"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Group } from "~~/types/app";

const groupList: Group[] = [
  {
    id: "1",
    name: "Group 1",
    type: "Trip",
  },
  {
    id: "2",
    name: "Group 2",
    type: "Home",
  },
  {
    id: "3",
    name: "Group 3",
    type: "Couple",
  },
  {
    id: "4",
    name: "Group 4",
    type: "Family",
  },
];

export default function GroupDetailPage() {
  const friendsAddrs: string[] = ["1", "2", "3", "4"];
  const [selectedFriendAddr, setSelectedFriendAddr] = useState<string | null>("1");

  return (
    <div className=" min-h-screen">
      {/* Group Info */}
      <div className="p-4">
        <h1 className="text-2xl font-bold mt-4">{groupList[0].name}</h1>
        <p className="text-xl text-green-600">Jesco M. owes you US$125.00</p>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 mt-4">
          <Link href="/settle" passHref>
            <button className="btn btn-primary">Settle up</button>
          </Link>

          <button className="btn btn-outline">Add Friends</button>
          <button className="btn btn-outline">Balances</button>
          <button className="btn btn-outline">Totals</button>
        </div>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Add Friends</span>
          </div>
          <select
            className="select select-bordered w-full max-w-xs"
            onChange={e => setSelectedFriendAddr(e.target.value)}
          >
            {selectedFriendAddr == null && (
              <option disabled selected>
                Choose a friend
              </option>
            )}
            {friendsAddrs.map(friendAddr => (
              <option key={friendAddr} value={friendAddr} selected={friendAddr == selectedFriendAddr}>
                Friend {friendAddr}
              </option>
            ))}
          </select>
        </label>

        {/* Expenses List */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold">July 2024</h2>
          <Link href="/expense" className="block mt-4">
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-200">
              <div className="card-body">
                <div className="flex items-center">
                  <div className="mr-4">
                    <div className="bg-pink-200 p-2 rounded">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-bold">Hotel</h3>
                    <p className="text-sm">You paid US$250.00</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-600">you lent</p>
                    <p className="font-bold text-green-600">US$125.00</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="flex justify-center items-center space-x-2 space-y-2 flex-col sm:flex-row mt-8">
          <Link href="/add-expenses" passHref>
            <button className="btn btn-primary">Add an Expense</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
