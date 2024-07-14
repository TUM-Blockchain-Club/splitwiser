"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const AddExpense = () => {
  const searchParams = useSearchParams();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [groups, setGroups] = useState<string[]>([]);
  const [queryGroupId, setQueryGroupId] = useState<bigint>(BigInt(1));
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(searchParams.get("groupId"));
  const [customDistribution, setCustomDistribution] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(0);
  const [customFields, setCustomFields] = useState<{ address: string; amount: number }[]>([]);

  const handleAddCustomField = () => {
    setCustomFields([...customFields, { address: "", amount: 0 }]);
  };

  const handleRemoveCustomField = (index: number) => {
    setCustomFields(customFields.filter((_, idx) => idx !== index));
  };

  const handleCustomFieldChange = (index: number, field: "address" | "amount", value: string | number) => {
    const updatedFields = customFields.map((customField, idx) => {
      if (idx === index) {
        return {
          ...customField,
          [field]: value,
        };
      }
      return customField;
    });
    setCustomFields(updatedFields);
  };

  const { data: allGroups } = useScaffoldReadContract({
    contractName: "Splitwiser",
    functionName: "getUserGroups",
    args: undefined,
  });

  const { data: groupName } = useScaffoldReadContract({
    contractName: "Splitwiser",
    functionName: "getGroupName",
    args: [queryGroupId],
  });

  useEffect(() => {
    console.log(groupName);
    if (allGroups) {
      console.log("allGroups", allGroups);
      const newGroupIds = allGroups.map(groupId => groupId.toString());

      console.log("newGroupIds", newGroupIds);

      const GroupIds = [BigInt(1), BigInt(2), BigInt(3), BigInt(4)];
      const groupNames: string[] = [];
      GroupIds.map(groupID => {
        setQueryGroupId(groupID);
        if (groupName) {
          groupNames.push(groupName);
        }
      });
      setGroups(groupNames);
    }
  }, [allGroups, groupName]);

  return (
    <>
      <form className="flex flex-col space-y-4 p-4 max-w-md mx-3">
        <h1 className="text-3xl font-semibold">Add Expense</h1>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Group</span>
          </div>
          <select
            required
            className="select select-bordered w-full max-w-xs"
            value={selectedGroupId || ""}
            onChange={e => setSelectedGroupId(e.target.value)}
          >
            <option value="" disabled>
              Choose a group
            </option>
            {groups.map(groupId => (
              <option key={groupId} value={groupId}>
                Group {groupId}
              </option>
            ))}
          </select>
          {selectedGroupId && (
            <div className="label">
              <span className="label-text-alt">You selected group: {selectedGroupId}</span>
            </div>
          )}
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

        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Custom Distribution</span>
            <input
              type="checkbox"
              checked={customDistribution}
              className="checkbox"
              onChange={() => setCustomDistribution(!customDistribution)}
            />
          </label>
        </div>

        {customDistribution && (
          <>
            <h2 className={"text-xl font-semibold"}>Custom Distribution</h2>

            {customFields.map((customField, index) => (
              <div key={index} className="flex space-x-4">
                <input
                  type="text"
                  placeholder="Address"
                  value={customField.address}
                  onChange={e => handleCustomFieldChange(index, "address", e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                  required
                />
                <input
                  type="number"
                  placeholder="Amount"
                  value={customField.amount}
                  onChange={e => handleCustomFieldChange(index, "amount", parseFloat(e.target.value))}
                  className="input input-bordered w-full max-w-xs"
                  required
                />
                <button type="button" className="btn btn-error" onClick={() => handleRemoveCustomField(index)}>
                  <MinusIcon />
                </button>
              </div>
            ))}

            <button className="btn btn-outline w-full" type="button" onClick={handleAddCustomField}>
              <PlusIcon />
            </button>
          </>
        )}

        <div className="flex flex-col justify-between items-center mb-6 space-x-2 space-y-2 pt-4">
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
