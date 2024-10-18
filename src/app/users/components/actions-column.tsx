import React, { memo } from "react";
import { useDataContext } from "@/contexts/data";
import { IconButton } from "@/components/UI";
import { OverviewIcon, IdcardIcon } from "@/components/UI/icons";
import { useModal } from "@/contexts/modals";

interface ActionsColumnProps {
  userId: number;
}

const ActionsColumn: React.FC<ActionsColumnProps> = ({ userId }) => {
  const { fetchPostsList, fetchUser, user } = useDataContext();
  const { openModal } = useModal();
  const isSelected = userId === user?.id;
  const handleclick = () => {
    fetchUser(userId);
    openModal(`user-${userId}`);
  };

  return (
    <>
      <div className="flex gap-2">
        <IconButton
          onClick={() => fetchPostsList(userId)}
          icon={<OverviewIcon fill={isSelected ? "#e5e7eb" : "#000"} />}
          alt={`Posts for user: ${userId}`}
          tooltip="Show Posts"
        />
        <IconButton
          onClick={() => handleclick()}
          icon={<IdcardIcon fill={isSelected ? "#e5e7eb" : "#000"} />}
          alt="Open User infos"
          tooltip="Open User infos"
        />
      </div>
    </>
  );
};

export default memo(ActionsColumn);
