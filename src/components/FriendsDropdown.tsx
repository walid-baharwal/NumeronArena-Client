import { useEffect, useState } from "react";
import { TFriend } from "@/types/ApiResponse";
import { Button } from "./ui/button";
import { BellDotIcon, UserPlusIcon } from "lucide-react";
import CustomDropdown from "./CustomDropdown";
import { useFriends } from "@/hooks/useFriend";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";
import AddFriendsDropdown from "./AddFriendsDropdown";

const FriendsDropdown = () => {
  const { friends, loading } = useFriends();
  const [displayedFriends, setDisplayedFriends] = useState<TFriend[] | null>(null);
  const [searchValue, setSearchValue] = useState("");


  useEffect(() => {
    setDisplayedFriends(friends);
  }, [friends]);

  const handleSearchFriend = (name: string) => {
    if (name.trim() == "") {
      setSearchValue("");
      setDisplayedFriends(friends);
    } else if (friends) {
      setSearchValue(name);
      setDisplayedFriends(
        friends.filter((friend) => friend.fullName.toLowerCase().includes(name.toLowerCase()))
      );
    }
  };
  const handleDropdownClose = () => {
    setSearchValue("");
    if (friends) {
      setDisplayedFriends(friends);
    }
  };

  return (
    <>
      <CustomDropdown
        handleDropdownClose={handleDropdownClose}
        menuLabel="Friends"
        data={displayedFriends}
        isLoading={loading}
        input={{
          value: searchValue,
          onChange: handleSearchFriend,
          placeholder: "Search friends",
          disabled: friends == null,
        }}
      >
        <div className="space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button  variant="outline" className="text-xs hover:bg-red-500/20 ">
                <UserPlusIcon className="mr-2 h-4 w-4" /> Add Friends
              </Button>
            </DropdownMenuTrigger>
            <AddFriendsDropdown />
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button  variant="outline" className="text-xs hover:bg-red-500/20 ">
                <BellDotIcon className="mr-2 h-4 w-4" /> Friend Requests
              </Button>
            </DropdownMenuTrigger>
            <FriendsDropdown />
          </DropdownMenu>
        </div>
      </CustomDropdown>
    </>
  );
};

export default FriendsDropdown;
