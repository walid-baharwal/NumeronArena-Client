import React from "react";
import { TFriend } from "@/types/ApiResponse";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import FriendItem from "./FriendItem";

const FriendItemMemo = React.memo(({ friend }: { friend: TFriend }) => {
  return (
    <DropdownMenuItem key={friend._id} className="!p-0 !bg-transparent m-2">
      <FriendItem friend={friend} />
    </DropdownMenuItem>
  );
});

export default FriendItemMemo;
