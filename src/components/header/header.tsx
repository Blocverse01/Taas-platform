import { FC } from "react";
import { useRouter } from "next/router";
import { Avatar, Notification } from "@/assets/icon";

const Header: FC = () => {
  const router = useRouter();
  const pathnameParts = router.pathname.split("/").filter(Boolean);
  const lastPathname = pathnameParts[pathnameParts.length - 1];
  const pageTitle = lastPathname === "dashboard" ? "Overview" : lastPathname;

  return (
    <header className="relative flex justify-between items-center p-6 pt-12 capitalize  border-t-grey-3">
      <p className="text-[20px] font-medium">{pageTitle}</p>
      <div className="flex items-center space-x-5">
        <Notification />
        <Avatar />
      </div>
    </header>
  );
};

export { Header };
