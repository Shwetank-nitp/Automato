import Image from "next/image";
import Link from "next/link";
import logo from "@/public/images/logo.svg";

export default async function LayoutAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-8 w-full md:max-w-md px-4">
        <Link className="flex justify-center items-center gap-0.5" href="/">
          <Image alt="logo" src={logo} width={35} height={25} />
          <span className="font-semibold text-lg">Automato</span>
        </Link>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
