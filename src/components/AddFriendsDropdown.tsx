import { useEffect, useState } from "react";
import { TFriend } from "@/types/ApiResponse";
import CustomDropdown from "./CustomDropdown";
import { tmpfriends } from "@/hooks/useFriend";
import { useDebounceCallback } from "usehooks-ts";

const AddFriendsDropdown = () => {
  const [displayedFriends, setDisplayedFriends] = useState<TFriend[] | null>(null);
  const [username, setUsername] = useState<string>("");
  const debounceUsername = useDebounceCallback(setUsername, 500);
  const [loading, setLoading] = useState<boolean>(false);

  console.log("add friends", displayedFriends);

  useEffect(() => {
    setLoading(true);
    const fetchFriends = async () => {
      console.log("add fetch friends", displayedFriends);
      setTimeout(() => {
        if (username != "") {
          setDisplayedFriends(
            tmpfriends.filter((friend) =>
              friend.username.toLowerCase().includes(username.toLowerCase())
            )
          );
        }
        setLoading(false);
      }, 2000);
    };

    fetchFriends();
  }, [username]);

  const handleSearchFriend = (username: string) => {
    if (username.trim() == "") {
      debounceUsername("");
      setDisplayedFriends(null);
    } else {
      debounceUsername(username);
    }
  };
  const handleDropdownClose = () => {
    setUsername("");
    setDisplayedFriends(null);
  };

  return (
    <>
      <CustomDropdown
        className="!w-[280px]  "
        handleDropdownClose={handleDropdownClose}
        menuLabel="Add Friends"
        data={displayedFriends}
        isLoading={loading}
        input={{
          onChange: handleSearchFriend,
          placeholder: "Search friends by username",
          disabled: false,
        }}
      ></CustomDropdown>
    </>
  );
};

export default AddFriendsDropdown;
