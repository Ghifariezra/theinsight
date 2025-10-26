import { generateOTP } from "../../_lib/crypto/otpVerif";

export function verifyTokenOTP({ email, name }: { email: string; name: string; }) {
    if (!email || !name) {
        return null;
    }

    const createOTP = generateOTP();
    
    return createOTP;
}