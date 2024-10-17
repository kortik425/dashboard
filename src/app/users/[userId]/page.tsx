import React from "react";
import UserContent from "../components/user-content";
import { CompleteUser } from "@/interfaces/Idata";

interface UserProps {
  params: { userId: string };
}

const UserDetail: React.FC<UserProps> = async ({ params }) => {
  const { userId } = params;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  const user: CompleteUser = await response.json();

  return (
    <div className="m-auto">
      <h1>Informations of: {user.name}</h1>
      <UserContent user={user} />
    </div>
  );
};

export default UserDetail;
