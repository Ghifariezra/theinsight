import crypto from "crypto";

export function generateOTP(length = 6) {
    const otp = crypto.randomInt(10 ** (length - 1), 10 ** length);
    return otp.toString();
}
