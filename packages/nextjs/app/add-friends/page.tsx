"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import FriendsList from "./_components/FriendsList";
import { cacheExchange, fetchExchange } from "@urql/core";
import { createClient, gql } from "urql";
import { addFriend, deleteFriend, getFriends } from "~~/services/friendService";
import { ENSName, Friend } from "~~/types/app";

const client = createClient({
  url: "https://gateway-arbitrum.network.thegraph.com/api/e1c1034a567ce7f50c6971ee5fcb5798/subgraphs/id/5XqPmWe6gjyrJtFn9cLy237i4cWw2j9HcUJEXsP5qGtH",
  exchanges: [cacheExchange, fetchExchange],
});

const DATA_QUERY = gql`
  query GetDomains($nameStartsWith: String!) {
    domains(first: 3, orderBy: name, orderDirection: asc, where: { name_starts_with: $nameStartsWith }) {
      id
      name
      labelName
      labelhash
    }
  }
`;

const AddFriend = () => {
  const [address, setAddress] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [ens, setEns] = useState<ENSName[]>([]);
  const [clicked, setClicked] = useState<boolean>(false);
  const [friends, setFriends] = useState<Friend[]>([]);

  useEffect(() => {
    fetchFriends();
  }, []);

  useEffect(() => {
    if (!address) return;

    client
      .query(DATA_QUERY, { nameStartsWith: address })
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

  async function fetchFriends() {
    try {
      const fetchedFriends = await getFriends();
      setFriends(fetchedFriends);
    } catch (error) {
      console.error("Failed to fetch friends", error);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const newFriend = await addFriend({ address, name });
      setFriends([...friends, newFriend]);
      setAddress("");
      setName("");
      setClicked(false);
    } catch (error) {
      console.error("Failed to add friend", error);
    }
  }

  async function handleDeleteFriend(id: string) {
    try {
      await deleteFriend(id);
      setFriends(friends.filter(friend => friend.id !== id));
    } catch (error) {
      console.error("Failed to delete friend", error);
    }
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <h1 className="text-3xl font-semibold">Add Friend</h1>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Wallet Address / ENS</span>
          </div>
          <input
            type="text"
            placeholder="Wallet Address"
            className="input input-bordered w-full"
            required
            value={address}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
          />
          {!clicked &&
            ens.map(ensName => (
              <div
                key={ensName.labelName}
                onClick={() => {
                  setAddress(ensName.name);
                  setClicked(true);
                }}
                className="cursor-pointer hover:bg-gray-100 p-2"
              >
                <p>{ensName.name}</p>
              </div>
            ))}
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Name</span>
          </div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </label>

        <div className="flex flex-col space-y-2 pt-4">
          <button type="submit" className="btn btn-primary w-full">
            Add Friend
          </button>
          <Link href="/" passHref>
            <button className="btn btn-error w-full">Cancel</button>
          </Link>
        </div>
      </form>

      <FriendsList friends={friends} onDelete={handleDeleteFriend} />
    </div>
  );
};

export default AddFriend;
