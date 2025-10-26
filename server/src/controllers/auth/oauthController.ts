import {
    UserModel,
} from "../../models/userModel";
import {
    sign
} from "jsonwebtoken";
import { google } from "googleapis";
import {
    verifyTokenOTP
} from "../../helper/otp/verification";
import { 
    sendVerificationEmail
} from "../../helper/otp/sendEmail";
import type {
    Request,
    Response
} from "express";

export default class OAuthController {
    #TOKEN_EXPIRATION = 60 * 60 * 24;
    #JWT_SECRET = process.env.JWT_SECRET!;
    #scopes = [
        process.env.GOOGLE_EMAIL_URI!,
        process.env.GOOGLE_PROFILE_URI!,
    ];

    #oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID!,
        process.env.GOOGLE_CLIENT_SECRET!,
        process.env.GOOGLE_REDIRECT_URI!
    );

    #authorizeUrl = this.#oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: this.#scopes,
        include_granted_scopes: true,
    });
    #verifyOTP = verifyTokenOTP;

    googleRedirect = (req: Request, res: Response) => {
        res.redirect(this.#authorizeUrl);
    }

    googleCallback = async (req: Request, res: Response) => {
        const { code } = req.query;
        const { tokens } = await this.#oauth2Client.getToken(code as string);

        this.#oauth2Client.setCredentials(tokens);

        const oauth2 = google.oauth2({
            auth: this.#oauth2Client,
            version: "v2",
        });

        const { data } = await oauth2.userinfo.get();

        if (!data) {
            return res.status(400).json({ data });
        }

        let user = await UserModel.findOne({ email: data.email });

        if (!user) {
            const getToken = this.#verifyOTP({
                email: data.email!,
                name: data.name!
            });

            if (!getToken) {
                return res.status(500).json({ message: "Failed to generate OTP." });
            }

            user = new UserModel({
                name: data.name,
                email: data.email,
                googleId: data.id,
                verificationCode: getToken,
                verificationCodeExpiry: Date.now() + 1 * 60 * 1000,
            });
            await user.save();

            await sendVerificationEmail(
                user.email,
                user.name,
                getToken
            );
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
            maxAge: this.#TOKEN_EXPIRATION * 1000,
        });

        return res.redirect("http://localhost:3000/auth/success?token=" + token);
        // return res.redirect("http://localhost:3000/auth/signup?success=true&token=" + token);
    }
}