"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function LogoutButton() {
  async function logout() {
    authClient.signOut(
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
  }

  return <Button onClick={() => logout()}>Logout</Button>;
}
