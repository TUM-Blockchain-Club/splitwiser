// services/groupService.ts
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export interface Group {
  id?: string;
  name: string;
  type: string;
}

export async function addGroup(group: Omit<Group, "id">): Promise<Group> {
  try {
    const response = await axios.post<Group>(`${API_URL}/groups`, group);
    return response.data;
  } catch (error) {
    console.error("Error adding group:", error);
    throw error;
  }
}

export async function getGroups(): Promise<Group[]> {
  try {
    const response = await axios.get<Group[]>(`${API_URL}/groups`);
    return response.data;
  } catch (error) {
    console.error("Error fetching groups:", error);
    throw error;
  }
}

export async function getGroupById(id: string): Promise<Group> {
  try {
    const response = await axios.get<Group>(`${API_URL}/groups/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching group with id ${id}:`, error);
    throw error;
  }
}

export async function updateGroup(id: string, updatedData: Partial<Group>): Promise<Group> {
  try {
    const response = await axios.put<Group>(`${API_URL}/groups/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating group with id ${id}:`, error);
    throw error;
  }
}

export async function deleteGroup(id: string): Promise<void> {
  try {
    await axios.delete(`${API_URL}/groups/${id}`);
  } catch (error) {
    console.error(`Error deleting group with id ${id}:`, error);
    throw error;
  }
}
