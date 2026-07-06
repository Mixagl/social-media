import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Button } from "../ui/button";
import UserMenu from "../shared/UserMenu";

export default async function Header() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <header className="sticky top-0 z-50 w-full bg-background/70 border-b border-border/40 backdrop-blur-xl antialiased">
      <div className="mx-auto flex h-12 max-w-5xl items-center justify-between px-6">
        <div className="flex items-center">
          <Link
            href="/"
            className="text-[17px] font-semibold tracking-tight text-foreground/90 transition-opacity hover:opacity-70"
          >
            mixagl
          </Link>
        </div>

        {/* <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/feed"
            className="text-[12px] font-normal tracking-wide text-muted-foreground/80 transition-colors hover:text-foreground"
          >
            Лента
          </Link>
          <Link
            href="/explore"
            className="text-[12px] font-normal tracking-wide text-muted-foreground/80 transition-colors hover:text-foreground"
          >
            Поиск
          </Link>
          <Link
            href="/messages"
            className="text-[12px] font-normal tracking-wide text-muted-foreground/80 transition-colors hover:text-foreground"
          >
            Сообщения
          </Link>
        </nav> */}
        <nav></nav>

        {session ? (
          <div className="flex items-center">
            <UserMenu username={session.user.name} />
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              asChild
              className="h-7 rounded-full px-3 text-[13px] font-normal tracking-tight text-muted-foreground/90 transition-opacity hover:bg-transparent hover:opacity-70 cursor-pointer"
            >
              <Link href="/signup">Sign up</Link>
            </Button>

            <Button
              variant="default"
              asChild
              className="h-7 rounded-full bg-blue-600 px-3.5 text-[13px] font-medium tracking-tight text-white transition-colors hover:bg-blue-500! cursor-pointer shadow-xs border border-blue-700/10"
            >
              <Link href="/login">Log in</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
