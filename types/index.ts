export type Post = {
  id: number;
  title: string;
  description: string | null;
  content: string;
  createdAt: Date;
  authorId: string;
};
