import slugify from "slugify";
import LZString from "lz-string";
// import { gzip, gunzip } from "zlib";
// import { promisify } from "util";
import {
    // sign,
    verify as jwtVerify,
    JwtPayload
} from "jsonwebtoken";
import {
    BlogModel
} from "../models/blogModel";
import type {
    Request,
    Response
} from "express";

export default class BlogController {
    // #TOKEN_EXPIRATION = 60 * 60 * 24;
    #JWT_SECRET = process.env.JWT_SECRET!;
    // #gzipAsync = promisify(gzip);
    // #gunzipAsync = promisify(gunzip);

    async getAllBlogs(req: Request, res: Response) {
        try {
            const blogs = await BlogModel.aggregate([
                // 1️⃣ Hanya ambil blog yang published
                { $match: { published: true } },

                // 2️⃣ Urutkan berdasarkan tanggal terbaru
                { $sort: { createdAt: -1 } },

                // 3️⃣ Group berdasarkan author
                {
                    $group: {
                        _id: "$author",
                        blog: { $first: "$$ROOT" }
                    }
                },

                // 4️⃣ Kembalikan bentuk dokumen ke bentuk blog aslinya
                { $replaceRoot: { newRoot: "$blog" } },

                // 5️⃣ Ambil data author dari collection users
                {
                    $lookup: {
                        from: "users",
                        localField: "author",
                        foreignField: "_id",
                        as: "author",
                        pipeline: [
                            {
                                $project: {
                                    _id: 1,
                                    name: 1,
                                    avatar: 1
                                }
                            }
                        ]
                    }
                },

                { $unwind: "$author" },

                // 6️⃣ Pilih field yang diinginkan
                {
                    $project: {
                        title: 1,
                        description: 1,
                        slug: 1,
                        createdAt: 1,
                        likes: 1,
                        tags: 1,
                        "author._id": 1,
                        "author.name": 1,
                        "author.avatar": 1
                    }
                }
            ]);

            res.status(200).json(blogs);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Terjadi kesalahan server" });
        }
    }

    async getBlogBySlug(req: Request, res: Response) {
        try {
            const { slug } = req.params;

            // ✅ Gunakan .lean() untuk langsung dapat plain object
            const blog = await BlogModel.findOne({ slug })
                .populate({
                    path: "author",
                    select: "_id name avatar"
                })
                .lean(); // ✅ Tambahkan .lean()

            if (!blog) {
                return res.status(404).json({
                    message: "Blog not found",
                    success: false
                });
            }

            // ✅ Decompress content
            if (blog.isCompressed && blog.content) {
                try {
                    const decompressed = LZString.decompressFromBase64(blog.content);

                    if (decompressed) {
                        blog.content = decompressed;
                    }
                } catch (decompressError) {
                    console.error("Decompression error:", decompressError);
                }
            }

            res.status(200).json(blog);
        } catch (error) {
            console.error("Get blog error:", error);
            res.status(500).json({
                message: "Terjadi kesalahan server",
                success: false
            });
        }
    }
    
    async getUserLikes(req: Request, res: Response) {
        try {
            const getToken = req.cookies.token;

            if (!getToken) {
                return res.status(401).json({
                    message: "Unauthorized - No token provided",
                    success: false
                });
            }

            const decoded = jwtVerify(getToken, this.#JWT_SECRET) as JwtPayload;

            const userId = decoded.userId;
            if (!userId) {
                return res.status(401).json({
                    message: "Invalid token payload",
                    success: false
                });
            }

            const likedBlogs = await BlogModel.find({
                likes: userId,
            }).select("slug");

            const likedSlugs = likedBlogs.map((blog) => blog.slug);
            console.log(likedSlugs);

            res.status(200).json({
                likedSlugs,
                success: true,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Terjadi kesalahan server" });
        }
    }

    async updateLikes(req: Request, res: Response) {
        try {
            const getToken = req.cookies.token;

            if (!getToken) {
                return res.status(401).json({
                    message: "Please login first to like this post",
                    success: false
                });
            }

            const decoded = jwtVerify(getToken, this.#JWT_SECRET) as JwtPayload;

            const userId = decoded.userId;
            if (!userId) {
                return res.status(401).json({ message: "Invalid token payload" });
            }

            const { slug } = req.body;
            // console.log(userId);
            // console.log(slug);

            const blog = await BlogModel.findOne({
                slug,
            });

            if (!blog) {
                return res.status(404).json({ message: "Blog not found" });
            }

            const isLiked = blog.likes.some((id) => id.toString() === userId);

            if (blog.likes.includes(userId)) {
                blog.likes = blog.likes.filter((id) => id.toString() !== userId);

                console.log(blog.likes);
            } else {
                blog.likes.push(userId);
                // console.log(blog.likes);
            }

            await blog.save();

            res.status(200).json({
                message: isLiked ? "You unliked this post" : "You liked this post",
                liked: !isLiked,
                totalLikes: blog.likes.length,
                success: true,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Terjadi kesalahan server" });
        }
    }

    async uploadBlog(req: Request, res: Response) {
        try {
            const getToken = req.cookies.token;

            if (!getToken) {
                return res.status(401).json({
                    message: "Unauthorized - No token provided",
                    success: false
                });
            }

            const decoded = jwtVerify(getToken, this.#JWT_SECRET) as JwtPayload;

            const userId = decoded.userId;
            if (!userId) {
                return res.status(401).json({
                    message: "Invalid token payload",
                    success: false
                });
            }

            const {
                title,
                description,
                tags,
                content,
                published
            } = req.body;

            const blog = await BlogModel.create({
                title,
                description,
                content,
                isCompressed: true,
                slug: slugify(
                    title,
                    {
                        lower: true,
                        strict: true
                    }
                ),
                tags,
                published,
                author: userId,
            });

            console.log(blog);

            res.status(200).json({
                message: "Blog uploaded successfully",
                success: true
            })
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Terjadi kesalahan server" });
        }
    }
}