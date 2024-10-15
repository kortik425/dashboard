import Link from "next/link";
import React from "react";

interface SidebarProps {
  // define your props here
}

const Sidebar: React.FC<SidebarProps> = ({}) => {
  return (
    <nav className="h-[100vh] w-96">
      <Link className="text-white block" href="/">
        Home
      </Link>
      <Link className="text-white block" href="/users">
        Users
      </Link>
      <Link className="text-white block" href="/settings">
        Settings
      </Link>
    </nav>
  );
};

export default Sidebar;
