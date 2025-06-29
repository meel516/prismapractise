import {
  deleteComment,
  getBlogComments,
  postCommentAtLevel,
  updateComment,
  getBlogCommentAtLevel
  
} from "../services/commentsService";
import { Request, Response } from "express";
import zod from "zod";
const commentPayload = zod.object({
  parentId: zod.number().nullable(),
  message: zod.string(),
  id: zod.number(),
});
const commentsController = async (req: Request, res: Response) => {
  const { blogId } = req.params;
  const comments = await getBlogComments(blogId);
  return res.status(200).json({
    status: "success",
    data: comments,
    message: "Blog comments fetched successfully",
  });
};
const commentsAtLevelController = async (req: Request, res: Response) => {
const {parentId, blogId} = req.params
const comments = await   getBlogCommentAtLevel(blogId,Number(parentId)); 
return res.status(200).json({
  status: "success",
  data: comments,
  message: "Blog comments fetched successfully BY Level",
})
};
const commentPostController = async (req: Request, res: Response) => {
  const { blogId } = req.params;
  const userId = req.user?.userId;
  commentPayload.omit({ id: true }).parse(req.body);
  const { parentId, message } = req.body;
  const result = await postCommentAtLevel(blogId, parentId, userId, message);
  return res.status(201).json({
    status: "success",
    data: result,
    message: "Blog comments added successfully",
  });
};
const updateCommentController = async (req: Request, res: Response) => {
  const { blogId } = req.params;
  commentPayload
    .omit({
      parentId: true,
    })
    .parse(req.body);
  const { message, id } = req.body;
  const result = await updateComment(id, message, blogId);
  return res.status(201).json({
    status: "success",
    data: result,
    message: "Blog comments updated successfully",
  });
};
const deleteCommentController = async (req: Request, res: Response) => {
  const { blogId } = req.params;
  commentPayload
    .omit({
      parentId: true,
      message: true,
    })
    .parse(req.body);
  const { id } = req.body;
  const result = await deleteComment(id, blogId);
  return res.status(201).json({
    status: "success",
    data: result,
    message: "Blog comments deleted successfully",
  });
};
export {
  commentsController,
  commentPostController,
  updateCommentController,
  deleteCommentController,
  commentsAtLevelController
};
