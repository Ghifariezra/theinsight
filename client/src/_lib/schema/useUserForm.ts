import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    RegisterSchema,
    VerificationSchema,
    LoginSchema,
    type RegisterSchemaType,
    type VerificationSchemaType,
    type LoginSchemaType
} from "@/_validations/userValidation";

export const useUserForm = () => {
    const formSignup = useForm<RegisterSchemaType>({
        resolver: zodResolver(RegisterSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const formVerification = useForm<VerificationSchemaType>({
        resolver: zodResolver(VerificationSchema),
        defaultValues: {
            pin: "",
        },
    })

    const formLogin = useForm<LoginSchemaType>({
        resolver: zodResolver(LoginSchema),
        mode: "onChange",
        defaultValues: {
            email: "",
            password: "",
        },
    });


    return {
        formSignup,
        formVerification,
        formLogin
    };
};