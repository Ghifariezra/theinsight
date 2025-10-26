import nodemailer from "nodemailer";
import RenderVerifyEmail from "../../_lib/react-email/verifyOtp";

export async function sendVerificationEmail(toEmail: string, toName: string, otp: string) {
    try {
        const transport = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: Number(process.env.MAIL_PORT),
            secure: true,
            priority: "high",
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        const convertHtml = await RenderVerifyEmail({
            userName: toName,
            verificationCode: otp
        });

        const mailOptions = {
            from: `TheInsight <${process.env.MAIL_USER}>`,
            to: toEmail,
            subject: "Verify your account",
            html: convertHtml
        };

        const info = await transport.sendMail(mailOptions);
        console.log("Verification email sent successfully.");

        return info;
    } catch (error) {
        console.log("Error in sending verification email:", error);
        throw new Error("Failed to send verification email.");
    }
};