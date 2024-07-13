// services/groupService.ts
import axios from "axios";
import { Friend } from "~~/types/app";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function addFriend(friend: Omit<Friend, "id">): Promise<Friend> {
  try {
    const response = await axios.post<Friend>(`${API_URL}/friends`, friend);
    return response.data;
  } catch (error) {
    console.error("Error adding group:", error);
    throw error;
  }
}

export async function getFriends(): Promise<Friend[]> {
  try {
    const response = await axios.get<Friend[]>(`${API_URL}/friends`);
    return response.data;
  } catch (error) {
    console.error("Error fetching groups:", error);
    throw error;
  }
}

export async function deleteFriend(id: string): Promise<void> {
  try {
    await axios.delete(`${API_URL}/friends/${id}`);
  } catch (error) {
    console.error(`Error deleting friend with id ${id}:`, error);
    throw error;
  }
}
