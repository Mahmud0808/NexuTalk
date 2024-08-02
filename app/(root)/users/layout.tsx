import Sidebar from "@/components/layout/Sidebar";
import UserList from "@/components/layout/UserList";
import getUsers from "@/lib/actions/getUsers.actions";

export default async function UsersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const users = await getUsers();

  return (
    <Sidebar>
      <div className="h-full">
        <UserList items={users} />
        {children}
      </div>
    </Sidebar>
  );
}
