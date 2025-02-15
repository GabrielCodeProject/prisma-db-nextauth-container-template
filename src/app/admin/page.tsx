import { getSession } from "next-auth/react";

export default async function AdminPanel() {
  // Check the session directly
  const session = await getSession();
  console.log(session);

  return (
    <div className="flex flex-col flex-wrap items-center bg-white min-h-screen">
      <h1 className="text-black">Admin Panel</h1>
      <p className="text-black">Only visible to ADMIN users</p>
    </div>
  );
}
