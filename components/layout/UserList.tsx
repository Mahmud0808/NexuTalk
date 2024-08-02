"use client";

import { User } from "@prisma/client";
import UserListItem from "../common/UserListItem";

interface UserListProps {
  items: User[];
}

const UserList = ({ items }: UserListProps) => {
  return (
    <aside className="fixed block left-0 inset-y-0 pb-20 lg:pb-0 lg:left-20 w-full lg:w-80 overflow-y-auto border-r border-gray-200">
      <div className="px-5">
        <div className="flex-col">
          <div className="py-4 text-2xl font-bold text-neutral-800">People</div>
        </div>
        {items.map((item) => (
          <UserListItem key={item.id} data={item} />
        ))}
      </div>
    </aside>
  );
};

export default UserList;
