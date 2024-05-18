import React from "react";
import { Skeleton } from "@mantine/core";

export default function ReminderCardLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
      {[1, 2, 3].map((value) => {
        return (
          <div
            key={value}
            className="col-span-4 rounded overflow-hidden shadow-lg border p-5 space-y-5"
          >
            <div className="flex items-center gap-2">
              <Skeleton className=" h-10 w-55 rounded-full"></Skeleton>
            </div>
            <Skeleton className=" h-5 w-52 rounded-full"></Skeleton>
            <Skeleton className=" h-5 w-48 rounded-full"></Skeleton>
            <Skeleton className=" h-5 w-20 rounded-full"></Skeleton>
          </div>
        );
      })}
    </div>
  );
}
