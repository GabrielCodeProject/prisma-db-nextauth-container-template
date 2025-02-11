import { addTask } from "../actions/actions";
import prisma from "@/lib/db";

export default async function Home() {
  //prisma client
  const tasks = await prisma.task.findMany();
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
        {tasks.map((task) => (
          <li className="text-black" key={task.id}>
            {task.title}
          </li>
        ))}
      </ul>

      <form action={addTask} className="space-x-2 h-4">
        <input
          type="text"
          name="title"
          className="px-3 py-1 rounded text-black border-2 border-gray-500"
        />
        <button
          type="submit"
          className="bg-blue-500 px-3 py-1 text-white rounded"
        >
          Add task
        </button>
      </form>
    </div>
  );
}
