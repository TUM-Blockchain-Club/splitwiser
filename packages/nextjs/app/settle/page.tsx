"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
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
  const { primaryWallet } = useDynamicContext();
  const connectedAddress = primaryWallet?.address;
  const router = useRouter();

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

  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract("Splitwiser");
  // const EURC_ADDR = "0x808456652fdb597867f38412077A9182bf77359F"
  async function addExpenseOnChain(): Promise<any> {
    try {
      if (!connectedAddress) {
        throw new Error("No wallet connected");
      } else {
        console.log("connectedAddress", connectedAddress);
        const result = await writeYourContractAsync({
          functionName: "addExpense",
          //query creditors ID in the group
          args: [BigInt(4), [connectedAddress], [BigInt(4)], "Expense"],
        });
        console.log("trx Hash:", result);
        if (!result) {
          throw new Error("No result returned");
        } else {
          // const trx = await getTransactionReceipt(config, { hash: result });
          // console.log("Transaction Content", trx);
          // return trx;
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
      const txResult = await addExpenseOnChain();
      console.log("txResult", txResult);

      // // Wait for the transaction to be mined and get the receipt
      // const receipt = await txResult.wait();

      // const onChainGroupId = txResult;

      console.log("Expense created on chain", txResult);

      // const queryParams = new URLSearchParams({
      //   name: "Expense",
      //   type: 'none',
      //   onChainId: onChainGroupId.toString(),
      // }).toString();

      // Navigate to the new page
      router.push("/");
    } catch (error) {
      console.error("Failed to settle", error);
      // You might want to show an error message to the user here
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4 max-w-md mx-3">
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
