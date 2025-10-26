import mongoose, { Schema, Document, Model } from "mongoose";
import type { IUser } from "./userModel";

interface IBlog extends Document {
    title: string;
    description: string;
    content: string;
    isCompressed: boolean;
    author: IUser["_id"];
    tags?: string[];
    slug: string;
    published: boolean;
    likes: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const blogSchema = new Schema<IBlog>(
    {
        title: { 
            type: String, 
            required: true, 
            trim: true 
        },
        description: { 
            type: String, 
            required: true, 
            trim: true 
        },
        content: { 
            type: String, 
            required: true 
        },
        isCompressed: {
            type: Boolean,
            default: false
        },
        author: { 
            type: Schema.Types.ObjectId, 
            ref: "User", 
            required: true 
        },
        tags: [{ 
            type: String 
        }],
        slug: { 
            type: String, 
            // required: true, 
            unique: true 
        },
        published: { 
            type: Boolean, 
            default: false 
        },
        likes: [{ 
            type: Schema.Types.ObjectId, 
            ref: "User" 
        }],
    },
    { timestamps: true }
);

export const BlogModel: Model<IBlog> =
    mongoose.models.Blog || mongoose.model<IBlog>("Blog", blogSchema);
