"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Address } from "~~/components/scaffold-eth";

export default function GroupDetailPage() {
  const searchParams = useSearchParams();
  const groupName = searchParams.get("name");
  const groupType = searchParams.get("type");
  const onChainGroupId = searchParams.get("onChainId");
  // const friendsAddrs: string[] = ["1", "2", "3", "4"];
  const [selectedFriendAddr, setSelectedFriendAddr] = useState<string>("");
  const [showAddFriends, setShowAddFriends] = useState(false);
  const [showTotalsModal, setShowTotalsModal] = useState(false);

  return (
    <div className=" min-h-screen">
      {/* Group Info */}
      <div className="p-4">
        <h1 className="text-2xl font-bold mt-4">{groupName}</h1>
        <h2 className="text-2xl font-bold mt-4">{groupType}</h2>
        <p className="text-xl text-green-600">{onChainGroupId}</p>

        <p className="text-xl text-green-600">Jesco M. owes you US$125.00</p>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 mt-4">
          <Link href="/settle" passHref>
            <button className="btn btn-primary">Settle up</button>
          </Link>

          <button className="btn btn-outline" onClick={() => setShowAddFriends(!showAddFriends)}>
            Add Friends
          </button>
          <button className="btn btn-outline">Balances</button>
          <button className="btn btn-outline" onClick={() => setShowTotalsModal(true)}>
            Group Members
          </button>
        </div>

        {showAddFriends && (
          <div className="flex flex-row items-end gap-2 mt-4">
            <label className="form-control flex-grow">
              <div className="label">
                <span className="label-text">Add Friends</span>
              </div>
              <input
                type="text"
                placeholder="Friend's Wallet Address"
                value={selectedFriendAddr}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSelectedFriendAddr(e.target.value)}
                className="input input-bordered w-full"
                required
              />
            </label>

            <Link href="/add-expenses" className="flex-shrink-0">
              <button className="btn btn-primary h-full">Save</button>
            </Link>
          </div>
        )}

        {showTotalsModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Group Members</h3>
                <button className="btn btn-ghost btn-sm btn-circle" onClick={() => setShowTotalsModal(false)}>
                  ✕
                </button>
              </div>
              <div className="space-y-3">
                <div className="flex space-x-4">
                  <div>
                    <span className="text-sm font-bold">Addresses:</span>
                    <Address address="0x2efae341079CE80b3C664500Af59E1a9829eAf12" />
                  </div>
                  <div>
                    <span className="text-sm font-bold pl-3">Names:</span>

                    <div className="flex items-center flex-shrink-0">
                      <div className="flex-shrink-0">
                        <p className="text-base">Jesco M.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-3"></div>
              </div>
            </div>
          </div>
        )}

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
