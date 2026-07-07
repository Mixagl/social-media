"use client";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { User } from "lucide-react";
import { authClient } from "@/lib/auth-client";

interface Props {
  username: string;
}

export default function UserMenu({ username }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 py-1 px-2.5 rounded-full text-[13px] font-medium text-muted-foreground transition-all hover:bg-muted/50 hover:text-foreground cursor-pointer outline-none focus-visible:bg-muted/80">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-muted-foreground/70">
            <User className="h-3 w-3 stroke-[2.5]" />
          </div>
          <span className="max-w-25 truncate tracking-tight">{username}</span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={6}
        className="w-48 rounded-xl border border-border/50 bg-background/80 backdrop-blur-lg p-1 shadow-2xl"
      >
        <DropdownMenuItem asChild>
          <Link href={`/profile`}>Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/`}>Settings</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-1 bg-border/40" />

        <DropdownMenuItem
          className="text-red-500 focus:text-white! focus:bg-red-500!"
          onClick={async () => {
            await authClient.signOut();
            window.location.href = "/";
          }}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
