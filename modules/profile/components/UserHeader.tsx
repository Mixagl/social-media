import { User } from "lucide-react";

interface Props {
  username: string;
  email: string;
}

export default function UserHeader({ username, email }: Props) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-10 border-b border-border/40">
      <div className="flex items-center gap-5">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground/60 border border-border/20 shadow-xs">
          <User className="h-10 w-10 stroke-[1.5]" />
        </div>

        <div className="space-y-1">
          <h1 className="text-[28px] font-semibold tracking-tight text-foreground/90 leading-tight">
            {username}
          </h1>

          <span className="truncate text-[13px] text-muted-foreground tracking-tight">
            {email}
          </span>
        </div>
      </div>
    </div>
  );
}
