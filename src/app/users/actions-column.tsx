import React, { memo } from "react";
import { useDataContext } from "@/contexts/data";
import overviewIcon from "../../assets/overview.svg";
import { IconButton } from "@/components/UI";

interface ActionsColumnProps {
  userId: number;
}

const ActionsColumn: React.FC<ActionsColumnProps> = ({ userId }) => {
  const { fetchPosts } = useDataContext();
  return (
    <div>
      <IconButton
        onClick={() => fetchPosts(userId)}
        src={overviewIcon}
        alt={`Posts for user: ${userId}`}
        tooltip="Show Posts"
      />
    </div>
  );
};

export default memo(ActionsColumn);
