import React from "react";
import { Skeleton } from "./ui/skeleton";

const FriendsLoading = () => {
  return (
    <>
      {[...Array(3)].map((_, idx) => (
        <div key={idx} className="flex items-center gap-2 rounded-lg p-2 m-2  bg-black/50">
          <Skeleton className="h-10 w-10 rounded-full bg-muted" />
          <div className="space-y-2">
            <Skeleton className="h-3 w-[150px] bg-muted" />
            <Skeleton className="h-3 w-[100px] bg-muted" />
          </div>
        </div>
      ))}
    </>
  );
};

export default FriendsLoading;
