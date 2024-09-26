import { User } from "@prisma/client";

import Image from "next/image";

type Props = {
  user: User;
};

export const UserPageTitle = ({ user }: Props) => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative w-16 h-16">
        <Image
          src={user.image || "/images/default-avatar.png"}
          alt={user.username}
          layout="fill"
          className="rounded-full object-cover"
        />
      </div>
      <div>
        <p className="text-lg font-semibold">{user.name}</p>
        <p className="text-xs text-gray-500 font-medium">@{user.username}</p>
      </div>
    </div>
  );
};
