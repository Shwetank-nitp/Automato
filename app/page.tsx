import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Demo } from "./demo-client";

export default function Page() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.getUsers.queryOptions());
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Demo />
    </HydrationBoundary>
  );
}
