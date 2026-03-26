import { requireAuth } from "@/lib/auth-require";
import LogoutButton from "./tmp-logout";
import { caller, trpc } from "@/trpc/server";

export default async function Page() {
  // Note: Session is not null iff the header contains valid credential
  // else the user will be redirected to fallback_url, i.e., /login
  // so if its not redirected, yet which means session is NOT NULL.
  await requireAuth();

  const user = await caller.getUser();

  return (
    <div className="h-screen w-screen text-center flex flex-col justify-center items-center">
      <h1>This is a protected page</h1>
      {JSON.stringify(user)}
      <LogoutButton />
    </div>
  );
}
