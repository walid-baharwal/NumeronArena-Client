import { TFriend } from "@/types/ApiResponse";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { AntennaIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
const FriendItem = ({ friend }: { friend: TFriend }) => {
  return (
    <div className="flex items-center justify-between rounded-lg px-3 py-[9px] transition-colors   bg-black/50 w-full ">
      <Link
        key={friend?._id}
        className={`flex items-center gap-2    `}
        to={`/profile/${friend?.username}`}
      >
        <Avatar className="border w-10 h-10">
          {friend.avatar ? (
            <AvatarImage alt="User Avatar" src={friend?.avatar} />
          ) : (
            <AvatarImage alt="User Avatar" src="/user-default-avatar.jpeg" />
          )}
          <AvatarFallback>{/* {friend && getInitials(friend.user.fullName)} */}</AvatarFallback>
        </Avatar>
        <div className="grid gap-0.5">
          <p className="text-sm font-medium leading-none">{friend?.fullName}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">Online</p>
        </div>
      </Link>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "size-10 rounded-full hover:bg-red-500/20"
            )}
          >
            <AntennaIcon className="size-[18px]" />
          </DropdownMenuTrigger>
          {/*  */}
        </DropdownMenu>
      </div>
    </div>
  );
};

export default FriendItem;
