import React from "react";
import Link from "next/link";
import { UsersIcon, HomeIcon, SettingsIcon } from "../UI/icons";

interface SidebarProps {
  // define your props here
}

const Sidebar: React.FC<SidebarProps> = ({}) => {
  return (
    <nav className="h-screen w-60">
      <Link
        className="flex gap-2 items-center stilised-h2 ml-6 mt-4 hover:underline text-white"
        href="/"
      >
        <HomeIcon fill="#fff" />
        Home
      </Link>
      <Link
        className="flex gap-2 items-center stilised-h2 ml-6 mt-4 hover:underline text-white"
        href="/users"
      >
        <UsersIcon fill="#fff" />
        Users
      </Link>
      <Link
        className="flex gap-2 items-center stilised-h2 ml-6 mt-4 hover:underline text-white"
        href="/settings"
      >
        <SettingsIcon fill="#fff" />
        Settings
      </Link>
    </nav>
  );
};

export default Sidebar;
