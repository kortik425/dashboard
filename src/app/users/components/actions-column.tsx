import React, { memo } from "react";
import { useDataContext } from "@/contexts/data";
import { IconButton } from "@/components/UI";
import { OverviewIcon, IdcardIcon } from "@/components/UI/icons";
import { useModal } from "@/contexts/modals";

interface ActionsColumnProps {
  userId: number;
}

const ActionsColumn: React.FC<ActionsColumnProps> = ({ userId }) => {
  const { fetchPostsList, fetchUser } = useDataContext();
  const { openModal } = useModal();

  const handleclick = (userId: number) => {
    fetchUser(userId);
    openModal(`user-${userId}`);
  };

  return (
    <>
      <div className="flex gap-2">
        <IconButton
          onClick={() => fetchPostsList(userId)}
          icon={<OverviewIcon />}
          alt={`Posts for user: ${userId}`}
          tooltip="Show Posts"
        />
        <IconButton
          onClick={() => handleclick(userId)}
          icon={<IdcardIcon />}
          alt="Open User infos"
          tooltip="Open User infos"
        />
      </div>
    </>
  );
};

export default memo(ActionsColumn);
