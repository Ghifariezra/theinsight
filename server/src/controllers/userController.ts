import { 
    sign,
    verify as jwtVerify,
    JwtPayload
 } from "jsonwebtoken";
import { 
    hash, 
    argon2id, 
    verify
 } from "argon2";
import {
    UserModel,
} from "../models/userModel";
import { 
    RegisterSchema,
    LoginSchema
 } from "../_lib/schema/auth/userSchema";
import {
    verifyTokenOTP
} from "../helper/otp/verification";
import { 
    sendVerificationEmail
} from "../helper/otp/sendEmail";
import type {
    Request,
    Response
} from "express";

export default class UserController {
    #TOKEN_EXPIRATION = 60 * 60 * 24;
    #JWT_SECRET = process.env.JWT_SECRET!;
    #verifyOTP = verifyTokenOTP;

    constructor() {}

    async registerUser(req: Request, res: Response) {
        try {
            const data = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            }

            const parsedData = RegisterSchema.parse(data);
            
            const { 
                name, 
                email, 
                password
             } = parsedData;

            const existingUser = await UserModel.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ 
                    message: "Email already registered",
                    success: false
                 });
            }

            const hashedPassword = await hash(password, {
                type: argon2id,
            });

            const getToken = this.#verifyOTP({
                email: parsedData.email,
                name: parsedData.name
            });

            if (!getToken) {
                return res.status(400).json({
                    message: "Invalid or expired token. Please verify your email again."
                });
            }

            let user = new UserModel({
                name,
                email,
                password: hashedPassword,
                verificationCode: getToken,
                verificationCodeExpiry: Date.now() + 1 * 60 * 1000,
            });
            await user.save();

            const info = await sendVerificationEmail(
                user.email,
                user.name,
                getToken
            );

            if (!info.accepted || info.rejected.length > 0) {
                return res.status(500).json({
                    message: "Failed to send verification code. Please try again later."
                });
            }
            
            const token = sign(
                {
                    userId: user._id,
                    email: user.email
                },
                this.#JWT_SECRET,
                {
                    subject: "user",
                    algorithm: "HS256",
                    encoding: "utf-8",
                    expiresIn: this.#TOKEN_EXPIRATION,
                    header: {
                        typ: "JWT",
                        alg: "HS256"
                    }
                }
            )

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV! === "production",
                sameSite: "strict",
                maxAge: this.#TOKEN_EXPIRATION * 1000
            });

            res.status(201).json({
                message: "User registered successfully",
                success: true,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar,
                    isVerified: user.isVerified
                },
            });
        } catch (error) {
            if (error instanceof Error && "issues" in error) {
                // Zod validation error
                return res.status(400).json({ message: "Invalid input", error });
            }
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async verifyEmail(req: Request, res: Response) {
        try {
            const { pin } = req.body;
            console.log(pin);
            
            const user = await UserModel.findOne({ 
                verificationCode: pin
             });
            if (!user) {
                return res.status(400).json({ 
                    message: "Invalid verification code",
                    success: false
                 });
            }

            // console.log(user);

            if (Date.now() > user.verificationCodeExpiry) {
                return res.status(400).json({ 
                    message: "Verification code has expired",
                    success: false
                 });
            }

            user.isVerified = true;
            user.verificationCode = "";
            user.verificationCodeExpiry = 0;
            await user.save();

            res.status(200).json({ 
                message: "Email verified successfully",
                success: true
             });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async resendVerificationCode(req: Request, res: Response) {
        try {
            const getToken = req.cookies.token;

            if (!getToken) {
                return res.status(401).json({ message: "Unauthorized - No token provided" });
            }

            const decoded = jwtVerify(getToken, this.#JWT_SECRET) as JwtPayload;

            const userId = decoded.userId;
            if (!userId) {
                return res.status(401).json({ message: "Invalid token payload" });
            }

            const user = await UserModel.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            if (user.isVerified) {
                return res.status(400).json({ message: "User is already verified" });
            }

            const newVerificationCode = this.#verifyOTP({
                email: user.email,
                name: user.name
            });

            if (!newVerificationCode) {
                return res.status(500).json({ message: "Failed to generate verification code" });
            }

            user.verificationCode = newVerificationCode;
            user.verificationCodeExpiry = Date.now() + 1 * 60 * 1000;
            await user.save();

            const info = await sendVerificationEmail(
                user.email,
                user.name,
                newVerificationCode
            );

            if (!info.accepted || info.rejected.length > 0) {
                return res.status(500).json({
                    message: "Failed to send verification code. Please try again later."
                });
            }

            res.status(200).json({
                message: "Verification code resent successfully",
                success: true
            })
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async loginUser(req: Request, res: Response) {
        try {
            // console.log(req.headers);

            const parsedData = LoginSchema.parse(req.body);
            const { email, password } = parsedData;

            const user = await UserModel.findOne({ email });
            if (!user) {
                return res.status(401).json({ message: "Invalid email or password" });
            }

            if (user.googleId && !user.password) {
                return res.status(401).json({ message: "Please login with Google" });
            }

            // Check password
            const isPasswordValid = await verify(
                user.password, 
                password
            );

            if (!isPasswordValid) {
                return res.status(401).json({ message: "Invalid email or password" });
            }

            const token = sign(
                { 
                    userId: user._id,
                    email: user.email
                 },
                this.#JWT_SECRET,
                { 
                    subject: "user",
                    algorithm: "HS256",
                    encoding: "utf-8",
                    expiresIn: this.#TOKEN_EXPIRATION,
                    header: {
                        typ: "JWT",
                        alg: "HS256"
                    }
                 }
            )

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV! === "production",
                sameSite: "strict",
                maxAge: this.#TOKEN_EXPIRATION * 1000
            });
            
            res.status(200).json({ 
                message: "Login successful",
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar,
                    createdAt: new Date(user.createdAt).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                    }),
                }
             });
        } catch (error) {
            console.error(error);
            res.status(500).json({ 
                message: "Internal server error"
             });
        }
    }

    async logoutUser(req: Request, res: Response) {
        try {
            if (!req.cookies.token) {
                return res.status(400).json({ message: "No active session found" });
            }

            res.clearCookie("token");
            res.status(200).json({ message: "Logout successful" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async profile(req: Request, res: Response) {
        try {
            const getToken = req.cookies.token;

            if (!getToken) {
                return res.status(401).json({ message: "Unauthorized - No token provided" });
            }

            // ✅ Verifikasi token JWT
            const decoded = jwtVerify(getToken, this.#JWT_SECRET) as JwtPayload;

            // ✅ Ambil user ID dari payload token
            const userId = decoded.userId;
            if (!userId) {
                return res.status(401).json({ message: "Invalid token payload" });
            }

            // ✅ Cari user dari database
            const user = await UserModel.findById(userId).select("-password");
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // ✅ Kirim data profile user
            res.status(200).json({
                message: "Profile fetched successfully",
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar,
                    isAdmin: user.isAdmin,
                    isVerified: user.isVerified,
                    verificationCodeExpiry: user.verificationCodeExpiry,
                    createdAt: new Date(user.createdAt).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                    })
                }
            });
        } catch (error) {
            if (error instanceof Error) {
                if (error.name === "TokenExpiredError") {
                    return res.status(401).json({ message: "Token expired, please log in again" });
                }

                if (error.name === "JsonWebTokenError") {
                    return res.status(401).json({ message: "Invalid token" });
                }
            }

            res.status(500).json({ message: "Internal server error" });
        }
    }

}