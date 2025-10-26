import express from "express";
import BlogController from "../controllers/blogController";

const blogController = new BlogController();
const blogRouter = express.Router();

// Rute untuk blog
blogRouter.get("/", blogController.getAllBlogs);
blogRouter.get("/liked", blogController.getUserLikes.bind(blogController));
blogRouter.get("/:slug", blogController.getBlogBySlug);
blogRouter.post("/like", blogController.updateLikes.bind(blogController));
blogRouter.post("/write", blogController.uploadBlog.bind(blogController));

export default blogRouter;