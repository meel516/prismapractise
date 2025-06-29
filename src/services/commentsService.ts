import dotenv from "dotenv";
import prisma from "../models/prisma.js";
import CustomError from "../utils/CustomError";
dotenv.config();

export const getBlogComments = async (blogId: string) => {
  const res = await prisma.chat.findMany({
    where: {
      blogId: blogId,
      parentId: null,
    },
    include: {
      _count: true,
      comments: {
        include: {
          _count: true,
        },
      },
    },
  });
  return res;
};
export const getBlogCommentAtLevel = async (
  blogId: string,
  parentId: number
) => {
  const res = await prisma.chat.findMany({
    where: {
      parentId: parentId,
      blogId: blogId,
    },
      include: {
      _count: true,
      comments: {
        include: {
          _count: true,
        },
      },
    },
  });
  return res;
};
export const postCommentAtLevel = async (
  blogId: string,
  parentId: number,
  userId: string,
  message: string
) => {
  console.log(blogId, parentId, userId, message,"post");
 
  if (parentId !== null) {
    const parentComment = await prisma.chat.findFirst({
      where: {
        id: parentId,
        blogId: blogId,
      },
    });
    if (!parentComment) {
      throw new CustomError(
        "Cannot add comment: parent comment not found",
        403
      );
    }
  }
  const res = await prisma.chat.create({
    data: {
      blogId: blogId,
      parentId: parentId,
      userId: userId,
      message: message,
    },
  });
  return res;
};
export const deleteComment = async (id: number, blogId: string) => {
  const res = await prisma.chat.delete({
    where: {
      id: id,
      blogId: blogId,
    },
  });
  return res;
};
export const updateComment = async (
  id: number,
  message: string,
  blogId: string
) => {
  console.log(id, message, blogId);
  const res = await prisma.chat.update({
    where: {
      id: id,
      blogId: blogId,
    },
    data: {
      message: message,
      edited:true
    },
  });
  return res;
};
