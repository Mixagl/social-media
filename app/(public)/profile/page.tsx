import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import UserHeader from "@/components/UserHeader";
import UserPosts from "@/components/UserPosts";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      authorId: session.user.id,
    },
  });

  return (
    <main className="w-full max-w-4xl mx-auto px-6 pt-12 pb-24 antialiased">
      <UserHeader username={session.user.name} email={session.user.email} />
      <UserPosts posts={posts} username={session.user.name} />
    </main>
  );
}
