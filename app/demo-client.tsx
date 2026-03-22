"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export function Demo() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.getUsers.queryOptions());

  return (
    <div className="h-screen flex justify-center items-center">
      <h2>Users:</h2>
      <ul>
        {data?.map((user) => (
          <li key={user.Id}>
            {user.Id} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}
