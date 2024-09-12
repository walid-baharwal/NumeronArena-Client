import { useEffect, useState } from "react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { FriendItem } from "./";
import { Input } from "./ui/input";
import { TFriend } from "@/types/ApiResponse";
import { ScrollArea } from "./ui/scroll-area";
import FriendsLoading from "./FriendsLoading";

const FriendsDropdownContent = () => {
  const [friends, setFriends] = useState<TFriend[] | null>(null);
  const [originalFriends, setOriginalFriends] = useState<TFriend[] | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setOriginalFriends(tmpfriends);
      setFriends(tmpfriends);
      setIsLoading(false);
    }, 1000);
    console.log("friends", friends);
  }, [originalFriends]);

  const handleSearchFriend = (name: string) => {
    if (name.trim() == "") {
      setFriends(originalFriends);
    } else if (originalFriends) {
      setSearchValue(name);
      setFriends(
        originalFriends.filter((friend) =>
          friend.fullName.toLowerCase().includes(name.toLowerCase())
        )
      );
    }
  };
  const handleDropdownClose = () => {
    setSearchValue(""); // Clear input value when dropdown closes
    if (originalFriends) {
      setFriends(originalFriends); // Reset friends list when dropdown closes
    }
  };

  return (
    <DropdownMenuContent
      className=" backdrop-blur-md  bg-black/50 mt-2"
      onCloseAutoFocus={handleDropdownClose}
    >
      <DropdownMenuItem className="!p-0 m-2">
        <Input
          type="search"
          disabled={originalFriends == null}
          value={searchValue}
          onChange={(e) => handleSearchFriend(e.target.value)}
          className="bg-black/50"
          placeholder="Search friends"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        />
      </DropdownMenuItem>
      <DropdownMenuLabel>Friends</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <ScrollArea className="h-72 w-full rounded-md border">
        {isLoading ? (
          <FriendsLoading />
        ) : friends ? (
          friends.map((friend) => (
            <DropdownMenuItem key={friend._id} className="!p-0 !bg-transparent m-2  ">
              <FriendItem friend={friend} />
            </DropdownMenuItem>
          ))
        ) : (
          <div className="h-64 w-full flex justify-center  items-center">No friends found</div>
        )}
      </ScrollArea>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Add friend and friend requests button here </DropdownMenuItem>
    </DropdownMenuContent>
  );
};

export default FriendsDropdownContent;

const tmpfriends = [
  {
    _id: 1,
    fullName: "John Smith",
    username: "johndoe",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    _id: 2,
    fullName: "Alice Johnson",
    username: "alicej",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    _id: 3,
    fullName: "Michael Brown",
    username: "michaelb",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    _id: 4,
    fullName: "Emily Davis",
    username: "emilyd",
    avatar: "https://i.pravatar.cc/150?img=4",
  },
  {
    _id: 5,
    fullName: "Daniel Garcia",
    username: "danielg",
  },
  {
    _id: 6,
    fullName: "Sarah Miller",
    username: "sarahm",
  },
  {
    _id: 7,
    fullName: "David Wilson",
    username: "davidw",
    avatar: "https://i.pravatar.cc/150?img=7",
  },
  {
    _id: 8,
    fullName: "Sophia Moore",
    username: "sophiam",
    avatar: "https://i.pravatar.cc/150?img=8",
  },
  {
    _id: 9,
    fullName: "James Taylor",
    username: "jamest",
    avatar: "https://i.pravatar.cc/150?img=9",
  },
  {
    _id: 10,
    fullName: "Isabella Thomas",
    username: "isabellat",
  },
  {
    _id: 11,
    fullName: "Ethan White",
    username: "ethanw",
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  {
    _id: 12,
    fullName: "Mia Martinez",
    username: "miam",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    _id: 13,
    fullName: "Benjamin Anderson",
    username: "benjamina",
  },
  {
    _id: 14,
    fullName: "Chloe Taylor",
    username: "chloet",
    avatar: "https://i.pravatar.cc/150?img=14",
  },
  {
    _id: 15,
    fullName: "Alexander Jackson",
    username: "alexanderj",
    avatar: "https://i.pravatar.cc/150?img=15",
  },
  {
    _id: 16,
    fullName: "Olivia Lee",
    username: "olivial",
    avatar: "https://i.pravatar.cc/150?img=16",
  },
  {
    _id: 17,
    fullName: "Lucas Harris",
    username: "lucash",
    avatar: "https://i.pravatar.cc/150?img=17",
  },
  {
    _id: 18,
    fullName: "Amelia Clark",
    username: "ameliac",
    avatar: "https://i.pravatar.cc/150?img=18",
  },
  {
    _id: 19,
    fullName: "Henry Lewis",
    username: "henryl",
    avatar: "https://i.pravatar.cc/150?img=19",
  },
  {
    _id: 20,
    fullName: "Lily Walker",
    username: "lilyw",
    avatar: "https://i.pravatar.cc/150?img=20",
  },
];
