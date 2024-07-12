// pages/groups/index.tsx
import { useEffect, useState } from "react";
import Link from "next/link";
import { Group, getGroups } from "../../services/groupService";

export default function GroupsList() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    getGroups()
      .then(data => {
        setGroups(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch groups:", err);
        setError("Failed to load groups");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Groups</h1>
      <ul>
        {groups.map(group => (
          <li key={group.id} className="mb-2">
            <Link href={`/groups/${group.id}`}>
              <a className="text-blue-500 hover:underline">{group.name}</a>
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/addgroup">
        <a className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">Create New Group</a>
      </Link>
    </div>
  );
}
