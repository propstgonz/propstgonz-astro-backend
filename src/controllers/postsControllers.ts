import { NextFunction, Request, Response } from 'express';
import * as postsServices from '../services/postsServices';

export const getAllPosts = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const posts = await postsServices.getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};