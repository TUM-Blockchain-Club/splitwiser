// services/groupService.ts
import { Friend } from "~~/types/app";

const FRIENDS_STORAGE_KEY = "friends";

function getStoredFriends(): Friend[] {
  const storedFriends = localStorage.getItem(FRIENDS_STORAGE_KEY);
  return storedFriends ? JSON.parse(storedFriends) : [];
}

function setStoredFriends(friends: Friend[]): void {
  localStorage.setItem(FRIENDS_STORAGE_KEY, JSON.stringify(friends));
}

export async function addFriend(friend: Omit<Friend, "id">): Promise<Friend> {
  try {
    const friends = getStoredFriends();
    const newFriend: Friend = {
      ...friend,
      id: Date.now().toString(), // Generate a unique ID
    };
    friends.push(newFriend);
    setStoredFriends(friends);
    return newFriend;
  } catch (error) {
    console.error("Error adding friend:", error);
    throw error;
  }
}

export async function getFriends(): Promise<Friend[]> {
  try {
    return getStoredFriends();
  } catch (error) {
    console.error("Error fetching friends:", error);
    throw error;
  }
}

export async function deleteFriend(id: string): Promise<void> {
  try {
    const friends = getStoredFriends();
    const updatedFriends = friends.filter(friend => friend.id !== id);
    setStoredFriends(updatedFriends);
  } catch (error) {
    console.error(`Error deleting friend with id ${id}:`, error);
    throw error;
  }
}
