import React from "react";
import { CompleteUser, User } from "@/interfaces/Idata";
import { TextInput } from "@/components/UI";

interface UserContentProps {
  user: User | null;
}

const UserContent: React.FC<UserContentProps> = ({ user }) => {
  const completeUser = user as CompleteUser;
  return (
    <div className="flex flex-col gap-5">
      <section
        id="details"
        className="grid grid-cols-[1fr_1fr] grid-rows-[1fr_1fr] gap-4 border-b-1"
      >
        <TextInput label="Name" disabled defaultValue={completeUser?.name} />
        <TextInput
          label="Username"
          disabled
          defaultValue={completeUser?.username}
        />
        <TextInput
          label="Email"
          type="email"
          disabled
          defaultValue={completeUser?.email}
        />
        <TextInput
          label="Phone number"
          type="tel"
          disabled
          defaultValue={completeUser?.phone}
        />
      </section>
      <section
        id="address"
        className="grid grid-cols-[1fr_1fr_1fr] grid-rows-[1fr_1fr] gap-4"
      >
        <TextInput
          label="Address"
          containerClassName="col-span-full row-span-1"
          disabled
          defaultValue={completeUser?.address?.street}
        />
        <TextInput
          label="Suite"
          containerClassName="col-start-1 col-end-2"
          disabled
          defaultValue={completeUser?.address?.suite}
        />
        <TextInput
          label="City"
          containerClassName="col-start-2 col-end-3"
          disabled
          defaultValue={completeUser?.address?.city}
        />
        <TextInput
          label="Zip Code"
          containerClassName="col-start-3 col-end-4"
          disabled
          defaultValue={completeUser?.address?.zipcode}
        />
      </section>
      <section id="others" className="grid grid-rows-[1fr_1fr] gap-4">
        <TextInput
          label="Company"
          disabled
          defaultValue={completeUser?.company?.name}
        />
        <TextInput
          label="Personal Website"
          disabled
          defaultValue={completeUser?.website}
        />
      </section>
    </div>
  );
};

export default UserContent;
