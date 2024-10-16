import React, { memo } from "react";
import { useDataContext } from "@/contexts/data";
import { IconButton } from "@/components/UI";
import { OverviewIcon, IdcardIcon } from "@/components/UI/icons";
import { useModal } from "@/contexts/modals";

interface ActionsColumnProps {
  userId: number;
}

const ActionsColumn: React.FC<ActionsColumnProps> = ({ userId }) => {
  const { fetchPosts, fetchUser } = useDataContext();
  const { openModal } = useModal();

  const handleclic = (userId: number) => {
    fetchUser(userId);
    openModal(userId);
  };

  return (
    <>
      <div className="flex gap-2">
        <IconButton
          onClick={() => fetchPosts(userId)}
          icon={<OverviewIcon />}
          alt={`Posts for user: ${userId}`}
          tooltip="Show Posts"
        />
        <IconButton
          onClick={() => handleclic(userId)}
          icon={<IdcardIcon />}
          alt="Open User infos"
          tooltip="Open User infos"
        />
      </div>
    </>
  );
};

export default memo(ActionsColumn);
