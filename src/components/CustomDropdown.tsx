import React from "react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import FriendsLoading from "./FriendsLoading";
import { TFriend } from "@/types/ApiResponse";
import FriendItemMemo from "./FriendItemMemo";

type CustomDropdownProps = {
  handleDropdownClose?: () => void;
  input?: {
    value?: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    className?: string;
    placeholder?: string;
  };
  menuLabel: string;
  isLoading?: boolean;
  data: TFriend[] | null;
  className?: string;
  children?: React.ReactNode;
};

const CustomDropdown = ({
  handleDropdownClose,
  input,
  menuLabel,
  isLoading,
  data,
  children,
  className,
}: CustomDropdownProps) => {
  return (
    <DropdownMenuContent
      className={` ${className} backdrop-blur-md  bg-black/50 mt-2`}
      onCloseAutoFocus={handleDropdownClose}
    >
      <DropdownMenuItem className="!p-0 m-2">
        <Input
          type="search"
          disabled={input?.disabled}
          value={input?.value}
          onChange={(e) => input?.onChange(e.target.value)}
          className={`bg-black/50 ${input?.className}`}
          placeholder={input?.placeholder}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        />
      </DropdownMenuItem>
      <DropdownMenuLabel>{menuLabel}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <ScrollArea className="h-72 w-full rounded-md border">
        {isLoading ? (
          <FriendsLoading />
        ) : data ? (
          data.map((friend) => <FriendItemMemo key={friend._id} friend={friend} />)
        ) : (
          <div className="h-64 w-full flex justify-center  items-center">No friends found</div>
        )}
      </ScrollArea>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="!p-0 m-2 !bg-transparent">{children}</DropdownMenuItem>
    </DropdownMenuContent>
  );
};

export default CustomDropdown;
