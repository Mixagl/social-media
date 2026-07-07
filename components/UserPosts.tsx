import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Post } from "@/app/generated/prisma/client";

interface UserPostsProps {
  posts: Post[];
  username: string;
}

export default function UserPosts({ posts, username }: UserPostsProps) {
  if (posts.length === 0) {
    return (
      <div className="mt-12 text-center py-16 border border-dashed border-border/60 rounded-2xl bg-muted/10 antialiased">
        <div className="max-w-70 mx-auto flex flex-col items-center gap-4">
          <div className="space-y-1">
            <p className="text-[15px] font-medium text-foreground/90 tracking-tight">
              Not posts yet
            </p>
            <p className="text-[13px] text-muted-foreground tracking-tight">
            Share your thoughts or projects
            </p>
          </div>

          <Button
            asChild
            className="h-8 rounded-full bg-blue-600 px-4 text-[13px] font-normal tracking-tight text-white transition-colors hover:bg-blue-500! cursor-pointer shadow-xs"
          >
            <Link href="/create-post" className="flex items-center gap-1.5">
              <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
              <span>Add post</span>
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12 space-y-8 antialiased">
      <h2 className="text-[17px] font-semibold tracking-tight text-foreground/90 px-0.5">
        Posts ({posts.length})
      </h2>

      <div className="divide-y divide-border/40">
        {posts.map((post) => {
          const formattedDate = new Date(post.createdAt).toLocaleDateString(
            "en-US",
            {
              day: "numeric",
              month: "long",
              year: "numeric",
            },
          );

          return (
            <article
              key={post.id}
              className="py-7 first:pt-0 last:pb-0 flex flex-col gap-2.5"
            >
              <div className="flex items-center gap-2 text-[12px] text-muted-foreground tracking-tight">
                <span className="font-medium text-foreground/80">
                  {username}
                </span>
                <span className="text-muted-foreground/30">•</span>
                <time dateTime={post.createdAt.toISOString()}>
                  {formattedDate}
                </time>
              </div>

              <h3 className="text-[19px] font-semibold tracking-tight text-foreground/90 leading-snug hover:text-blue-600 transition-colors">
                <Link href={`/posts/${post.id}`}>{post.title}</Link>
              </h3>

              {post.description && (
                <p className="text-[14px] font-normal text-muted-foreground tracking-tight leading-relaxed">
                  {post.description}
                </p>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
