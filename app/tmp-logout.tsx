"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LogoutButton() {
  const router = useRouter();

  async function logout() {
    await authClient.signOut(
      {},
      {
        onSuccess: function () {
          toast.info("Logout successfully");
        },

        onError: function (ctx) {
          toast.error("Something went wrong while logging out");
          console.error("Logout error", ctx.error);
        },
      }
    );
    router.push("/login");
  }

  return <Button onClick={() => logout()}>Logout</Button>;
}
