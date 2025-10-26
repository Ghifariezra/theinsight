export type UserPayload = {
    user: {
        id: string;
        name: string;
        email: string;
        avatar: string;
        isAdmin: boolean;
        isVerified: boolean;
        verificationCodeExpiry: number;
        createdAt: string;
    };
};

export type SignUpPayload = {
    name: string;
    email: string;
    password: string;
};

export type LoginPayload = Omit<SignUpPayload, "name">;