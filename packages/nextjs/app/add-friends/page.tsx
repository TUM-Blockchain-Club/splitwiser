"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cacheExchange, fetchExchange } from "@urql/core";
import { createClient, gql } from "urql";
import { addFriend } from "~~/services/friendService";

const client = createClient({
  url: "https://gateway-arbitrum.network.thegraph.com/api/e1c1034a567ce7f50c6971ee5fcb5798/subgraphs/id/5XqPmWe6gjyrJtFn9cLy237i4cWw2j9HcUJEXsP5qGtH",
  exchanges: [cacheExchange, fetchExchange],
});

const AddFriend = () => {
  const [address, setAddress] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [ens, setEns] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!address) return;
    const DATA_QUERY = gql`{
      domains(
       first: 5,
       orderBy: name,
       orderDirection: asc,
       where: { name_starts_with: ${address} }
     ) {
       id
       name
       labelName
       labelhash
     }
   }`;
    client
      .query(DATA_QUERY)
      .toPromise()
      .then(result => {
        if (result.error) {
          console.log("Error: ", result.error.message);
        } else {
          console.log("Data: ", result.data);
          setEns(result.data.domains);
        }
      });
  }, [address]);

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    try {
      const newFriend = await addFriend({ address, name });
      console.log("newFriend", newFriend);
      router.push("/"); // Redirect to home page after successful creation
    } catch (error) {
      console.error("Failed to add friend", error);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4 max-w-md mx-3">
        <h1 className="text-3xl font-semibold">Add Friend</h1>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Wallet Address / ENS</span>
          </div>
          <input
            type="text"
            placeholder="Wallet Address"
            className="input input-bordered w-full max-w-xs"
            required
            value={address}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
          />
          {ens.map(ensName => (
            <div
              key={ensName}
              onClick={() => {
                setAddress(ensName);
              }}
            >
              <p>{ensName}</p>
            </div>
          ))}
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Name</span>
          </div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            className="input input-bordered w-full max-w-xs"
            required
          />
        </label>

        <div className="flex flex-col justify-between items-center mb-6 space-x-2 space-y-2 pt-4">
          <Link href="/" passHref className={"w-full"}>
            <button className="btn btn-error w-full">Cancel</button>
          </Link>

          <button type="submit" className="btn btn-primary w-full">
            Add Friend
          </button>
        </div>
      </form>
    </>
  );
};

export default AddFriend;
