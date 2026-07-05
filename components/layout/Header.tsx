import Link from "next/link";
import { User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Button } from "../ui/button";

export default async function Header() {
  const username = "mixagl_user";
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 py-1 px-2.5 rounded-full text-[13px] font-medium text-muted-foreground transition-all hover:bg-muted/50 hover:text-foreground cursor-pointer outline-none focus-visible:bg-muted/80">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-muted-foreground/70">
                    <User className="h-3 w-3 stroke-[2.5]" />
                  </div>
                  <span className="max-w-25 truncate tracking-tight">
                    {session?.user.name}
                  </span>
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                sideOffset={6}
                className="w-48 rounded-xl border border-border/50 bg-background/80 backdrop-blur-lg p-1 shadow-2xl"
              >
                <DropdownMenuItem asChild>
                  <Link href={`/`}>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/`}>Settings</Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="my-1 bg-border/40" />

                <DropdownMenuItem
                  asChild
                  className="text-red-500 focus:text-white! focus:bg-red-500!"
                >
                  <Link href={`/`}>Log out</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
