import { headers } from "next/headers";
import { auth } from "./auth";
import { redirect } from "next/navigation";

export async function requireAuth(requireAuth = true, fallback_url = "/login") {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const isLoggedIn = !!session;

  if (isLoggedIn !== requireAuth) {
    redirect(fallback_url);
  }

  return session;
}
