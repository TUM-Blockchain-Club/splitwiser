"use client";

import React from "react";
import Link from "next/link";
import { DebtInfo } from "~~/types/app";

const debtList: DebtInfo[] = [
  {
    amount: 10.12,
    groupId: "Group 1",
  },
  {
    amount: 22,
    groupId: "Group 2",
  },
  {
    amount: 12.22,
    groupId: "Group 3",
  },
  {
    amount: 5.1,
    groupId: "Group 4",
  },
];

const Settle = () => {
  const [selectedDebt, setSelectedDebt] = React.useState<DebtInfo[]>(debtList);

  const handleCheckboxChange = (debt: DebtInfo) => {
    setSelectedDebt(prevSelectedDebt => {
      if (prevSelectedDebt.some(d => d.groupId === debt.groupId)) {
        // Remove the debt if it's already selected
        return prevSelectedDebt.filter(d => d.groupId !== debt.groupId);
      } else {
        // Add the debt if it's not selected
        return [...prevSelectedDebt, debt];
      }
    });
  };

  const totalDebt = selectedDebt.reduce((acc, debt) => acc + debt.amount, 0);

  return (
    <>
      <form className="flex flex-col space-y-4 p-4 max-w-md mx-3">
        <h1 className="text-3xl font-semibold">Settle Debts</h1>

        <div className="form-control flex flex-col space-y-2">
          {debtList.map((debt, index) => (
            <>
              {index !== 0 && <div className="divider" />}
              <label key={debt.groupId} className="label cursor-pointer">
                <span className="label-text">
                  {debt.groupId} ({debt.amount} Euro)
                </span>
                <input
                  type="checkbox"
                  checked={selectedDebt.some(d => d.groupId === debt.groupId)}
                  onChange={() => handleCheckboxChange(debt)}
                  className="checkbox"
                />
              </label>
            </>
          ))}
        </div>

        <div className="divider" />

        <div className={"flex justify-between"}>
          <p>Total:</p>
          <p>{totalDebt} Euro</p>
        </div>

        <div className="flex flex-col justify-between items-center mb-6 space-x-2 space-y-2 pt-8">
          <Link href="/" passHref className={"w-full"}>
            <button className="btn btn-error w-full">Cancel</button>
          </Link>

          <button type="submit" className="btn btn-primary w-full">
            Pay
          </button>
        </div>
      </form>
    </>
  );
};

export default Settle;
