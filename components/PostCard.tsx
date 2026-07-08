import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Post } from "@/types";

interface Props {
  post: Post;
  username: string;
}

export default function PostCard({ post, username }: Props) {
  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Link href={`/posts/${post.id}`} className="block group">
      <article className="w-full p-6 rounded-2xl border border-border/40 bg-background transition-all duration-300 ease-out hover:border-border/80 hover:bg-muted/30 hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)] flex flex-col gap-3 relative overflow-hidden">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[12px] text-muted-foreground/80 tracking-tight">
            <span className="font-medium text-foreground/70 transition-colors group-hover:text-foreground">
              {username}
            </span>
            <span className="text-muted-foreground/30">•</span>
            <time dateTime={post.createdAt.toISOString()}>{formattedDate}</time>
          </div>

          <div className="text-muted-foreground/40 transition-all duration-300 group-hover:text-blue-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            <ArrowUpRight className="h-4 w-4 stroke-2" />
          </div>
        </div>

        <h3 className="text-[20px] font-semibold tracking-tight text-foreground/90 leading-tight transition-colors group-hover:text-blue-600">
          {post.title}
        </h3>

        {post.description && (
          <p className="text-[14px] font-normal text-muted-foreground/90 tracking-tight leading-relaxed line-clamp-2 mt-0.5">
            {post.description}
          </p>
        )}
      </article>
    </Link>
  );
}
