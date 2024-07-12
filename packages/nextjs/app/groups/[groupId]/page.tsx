// pages/groups/[groupId].tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Group, getGroupById } from "../../../services/groupService";

export default function GroupDetail() {
  const router = useRouter();
  const { groupId } = router.query;
  const [group, setGroup] = useState<Group | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (groupId) {
      setLoading(true);
      getGroupById(groupId as string)
        .then(data => {
          setGroup(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to fetch group:", err);
          setError("Failed to load group details");
          setLoading(false);
        });
    }
  }, [groupId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!group) return <div>Group not found</div>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">{group.name}</h1>
      <p>Type: {group.type}</p>
      {/* Add more group details here */}
    </div>
  );
}
