import Link from "next/link";
import { ArrowLeft, Calendar, User } from "lucide-react";
import prisma from "@/lib/prisma";

interface Props {
  post: {
    id: number;
    title: string;
    description: string | null;
    content: string;
    createdAt: Date;
    authorId: string;
  };
}

export default async function PostDetailPage({ post }: Props) {
  const author = await prisma.user.findUnique({
    where: {
      id: post.authorId,
    },
  });

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="w-full max-w-2xl mx-auto px-6 pt-8 pb-24 antialiased">
      <div className="mb-10">
        <Link
          href="/profile"
          className="inline-flex items-center gap-1.5 text-[14px] text-blue-600 hover:underline tracking-tight group"
        >
          <ArrowLeft className="h-3.5 w-3.5 stroke-[2.5] transition-transform group-hover:-translate-x-0.5" />
          <span>Назад в профиль</span>
        </Link>
      </div>

      <article className="space-y-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-muted-foreground tracking-tight border-b border-border/30 pb-4">
          <div className="flex items-center gap-1.5 font-medium text-foreground/80">
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-muted text-muted-foreground/60">
              <User className="h-2.5 w-2.5 stroke-[2.5]" />
            </div>
            <span>{author?.name}</span>
          </div>

          <span className="text-muted-foreground/30 hidden sm:inline">•</span>

          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 stroke-[1.8] opacity-70" />
            <time dateTime={post.createdAt.toISOString()}>{formattedDate}</time>
          </div>
        </div>

        <h1 className="text-[32px] sm:text-[40px] font-bold tracking-tight text-foreground/90 leading-tight">
          {post.title}
        </h1>

        {post.description && (
          <p className="text-[18px] font-normal text-muted-foreground tracking-tight leading-relaxed pb-2">
            {post.description}
          </p>
        )}

        <div className="text-[16px] sm:text-[17px] font-normal text-foreground/85 tracking-tight leading-relaxed whitespace-pre-wrap pt-4 space-y-4">
          {post.content}
        </div>
      </article>
    </main>
  );
}
