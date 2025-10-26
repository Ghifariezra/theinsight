import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
    googleId?: string;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    avatar: string;
    isVerified: boolean;
    verificationCode: string;
    verificationCodeExpiry: number;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>(
    {
        googleId: { type: String },
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        password: {
            type: String,
            required: function (this: IUser): boolean {
                return !this.googleId;
            },
        },
        isAdmin: { type: Boolean, default: false },
        isVerified: { type: Boolean, default: false },
        verificationCode: { type: String, default: "" },
        verificationCodeExpiry: { type: Number, default: 0 },
        avatar: {
            type: String,
            default:
                "https://cdn0.iconfinder.com/data/icons/seo-web-4-1/128/Vigor_User-Avatar-Profile-Photo-01-128.png",
        },
    },
    { timestamps: true }
);

export const UserModel: Model<IUser> =
    mongoose.models.User || mongoose.model<IUser>("User", userSchema);
