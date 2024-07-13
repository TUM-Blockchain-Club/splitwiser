"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const AddExpense = () => {
  const searchParams = useSearchParams();
  const groupsIds: string[] = [];
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(searchParams.get("groupId"));
  const [amount, setAmount] = useState<number>(0);

  return (
    <>
      <form className="flex flex-col space-y-4 p-4 max-w-md mx-3">
        <h1 className="text-3xl font-semibold">Add Expense</h1>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Group</span>
          </div>
          <select className="select select-bordered w-full max-w-xs" onChange={e => setSelectedGroupId(e.target.value)}>
            {selectedGroupId == null && (
              <option disabled selected>
                Choose a group
              </option>
            )}
            {groupsIds.map(groupId => (
              <option key={groupId} value={groupId} selected={groupId == selectedGroupId}>
                groupId
              </option>
            ))}
          </select>
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Amount in EUR</span>
          </div>

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(parseFloat(e.target.value))}
            className="input input-bordered w-full max-w-xs"
            required
          />
        </label>

        <div className="flex flex-col justify-between items-center mb-6 space-x-2 space-y-2 pt-8">
          <Link href="/" passHref className={"w-full"}>
            <button className="btn btn-error w-full">Cancel</button>
          </Link>

          <button type="submit" className="btn btn-primary w-full">
            Add Expense
          </button>
        </div>
      </form>
    </>
  );
};

export default AddExpense;
