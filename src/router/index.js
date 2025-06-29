import express from "express";
import {
  commentsController,
  commentPostController,
  updateCommentController,
  deleteCommentController,
  commentsAtLevelController,
} from "../controller";
import { verifyToken } from "../middleware/auth";
const Router = express.Router();

Router.get("/:blogId", commentsController);
Router.get("/:blogId/:parentId", commentsAtLevelController);
Router.use(verifyToken);
Router.post("/:blogId", commentPostController);
Router.patch("/:blogId", updateCommentController);
Router.delete("/:blogId", deleteCommentController);
export { Router as commentsRouter };
