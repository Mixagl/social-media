import PostDetailPage from "@/components/PostDetailPage";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
  });

  if (!post) {
    notFound();
  }

  return <PostDetailPage post={post} />;
}
