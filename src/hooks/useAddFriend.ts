import { TFriend } from "@/types/ApiResponse";
import { useState, useEffect } from "react";

export function useAddFriends(username : string) {
  const [friends, setFriends] = useState<TFriend[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFriends = async () => {
      setTimeout(() => {
        setFriends(tmpfriends.filter((friend) => friend.username === username));
        setLoading(false);
      }, 2000);
    };

    fetchFriends();
  }, [username]); 

  return {friends, loading };
}
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
