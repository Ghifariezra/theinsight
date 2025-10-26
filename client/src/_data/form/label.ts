export const LabelSignup = [
    {
        name: "name",
        label: "Name",
        type: "text",
        placeholder: "Name",
        // required: true,
    },
    {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "Email",
        // required: true,
    },
    {
        name: "password",
        label: "Password",
        type: "password",
        placeholder: "********",
        // required: true,
    },
    {
        name: "confirmPassword",
        label: "Confirm Password",
        type: "password",
        placeholder: "********",
        // required: true,
    }
] as const;

export const LabelLogin = [
    {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "Email",
        // required: true,
    },
    {
        name: "password",
        label: "Password",
        type: "password",
        placeholder: "********",
        // required: true,
    },
] as const;