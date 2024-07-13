import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Group, getGroupById } from "../../../services/groupService";

export default function GroupDetailPage() {
  const router = useRouter();
  const { groupId } = router.query;
  // Note: Why fetch the group in useEffect? Why not fetch when creating the page? Try to think of better way
  // and prevent overcomplicating yourself
  const [group, setGroup] = useState<Group | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (groupId) {
      setLoading(true);
      getGroupById(groupId as string)
        .then(data => {
          setGroup(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to fetch group from Smart Contrac:", err);
          setLoading(false);
        });
    }
  }, [groupId]);

  if (loading) return <div className="loading loading-lg"></div>;
  if (!group) return <div>Group not found</div>;

  return (
    <div className="bg-base-200 min-h-screen">
      {/* Top Navigation */}
      <div className="navbar bg-base-100 shadow-lg">
        <div className="navbar-start">
          <Link href="/groups" className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Group Info */}
      <div className="p-4">
        <div className="avatar placeholder">
          <div className="bg-neutral-focus text-neutral-content rounded-full w-24">
            <span className="text-3xl">✈️</span>
          </div>
        </div>
        <h1 className="text-2xl font-bold mt-4">{group.name}</h1>
        <p className="text-xl text-green-600">Jesco M. owes you US$125.00</p>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 mt-4">
          <button className="btn btn-primary">Settle up</button>
          <button className="btn btn-outline">Charts</button>
          <button className="btn btn-outline">Balances</button>
          <button className="btn btn-outline">Totals</button>
        </div>

        {/* Expenses List */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold">July 2024</h2>
          <div className="card bg-base-100 shadow-xl mt-4">
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
        </div>
      </div>
    </div>
  );
}
