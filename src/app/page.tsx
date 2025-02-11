import { addTask, addUser } from "../actions/actions";
import prisma from "@/app/lib/db";

export default async function Home() {
  //prisma client
  const users = await prisma.user.findMany();
  //  const tasks = [
  //    {
  //      id: 1,
  //      name: "task 1",
  //    },
  //    {
  //      id: 2,
  //      name: "task 2",
  //    },
  //  ];
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
