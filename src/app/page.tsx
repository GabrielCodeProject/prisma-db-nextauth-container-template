"use client";

import { User } from "@prisma/client";
import { addUser } from "../actions/actions";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users");
        console.log("home page res: ", res);
        //const text = await res.text();
        //console.log("text home res: ", text);
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        console.log("data from homepage: ", data);
        //const data = JSON.parse(text);
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);
  console.log("session status: ", status);
  console.log("array data: ", users);
  console.log("Session from Home:", session);
  //if (!session) {
  //  return <div>Not authenticated</div>;
  //}
  if (users.length === 0) {
    return <div>no users</div>;
  }

  return (
    <div className="flex flex-col flex-wrap items-center bg-white min-h-screen">
      <h1 className="text-black">Tasks:</h1>

      <ul className="my-10 text-center">
        {users.map((user) => (
          <li className="text-black" key={user.id}>
            {user.email}
          </li>
        ))}
      </ul>

      <form action={addUser} className="space-x-2 h-4">
        <input
          type="text"
          name="email"
          className="px-3 py-1 rounded text-black border-2 border-gray-500"
        />
        <button
          type="submit"
          className="bg-blue-500 px-3 py-1 text-white rounded"
        >
          Add user
        </button>
      </form>
    </div>
  );
}
