import { prisma } from "@/lib/db";
import UsersClient from "./users-client";

export default async function AdminUsersPage() {
  const users = await prisma.adminUser.findMany({
    orderBy: { createdAt: "asc" },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-stone-800">Kullanıcılar</h1>
        <span className="text-sm text-stone-500">{users.length} kullanıcı</span>
      </div>
      <UsersClient users={users} />
    </div>
  );
}
