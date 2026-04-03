"use client";

import LogoutButton from "./tmp-logout";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Page() {
  // Note: Session is not null iff the header contains valid credential
  // else the user will be redirected to fallback_url, i.e., /login
  // so if its not redirected, yet which means session is NOT NULL.
  // await requireAuth();

  // const user = await caller.getUser();
  const trpc = useTRPC();
  const query = useQuery(trpc.getWorkflows.queryOptions());

  // const queryClient = useQueryClient();
  const create = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: () => {
        toast.success("job queued");
      },
    })
  );

  return (
    <div className="h-screen w-screen text-center flex flex-col justify-center items-center">
      <h1>This is a protected page</h1>
      {JSON.stringify(query.data)}

      <Button disabled={create.isPending} onClick={() => create.mutate()}>
        Create Workflow
      </Button>
      <LogoutButton />
    </div>
  );
}
