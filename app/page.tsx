import { requireAuth } from "@/lib/auth-require";

export default async function Page() {
  // Note: Session is not null iff the header contains valid credential
  // else the user will be redirected to fallback_url, i.e., /login
  // so if its not redirected, yet which means session is NOT NULL.
  await requireAuth();

  return <div>This is a protected page</div>;
}
