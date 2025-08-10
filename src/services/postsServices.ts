import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Post {
  id: string;
  url: string;
}

export const getAllPosts = async (): Promise<Post[]> => {
  try {
    const posts = await prisma.blogpost.findMany({
      select: {
        id: true,
        url: true,
      },
    });
    return posts;
  } catch (error) {
    console.error('DB error:', error);
    throw new Error('Failed to retrieve posts');
  }
};