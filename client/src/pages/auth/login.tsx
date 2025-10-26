import Section from "@/_components/layout/section";
import FormSection from "@/_components/layout/form";
import { Link } from "react-router";
import { Button } from "@/_components/ui/button";
import { Separator } from "@/_components/ui/separator";
import { FieldFormInput } from "@/_components/common/inputs/formInput";
import { Form } from "@/_components/ui/form";
import { LabelLogin } from "@/_data/form/label";
import { FcGoogle } from "react-icons/fc";
import React from "react";
import { useAuthContext } from "@/_hooks/auth/useAuthContext";
import { Spinner } from "@/_components/ui/spinner"

export default function Login() {
    const {
        formLogin,
        onSubmitLogin,
        loginPending,
        handleGoogleLogin
    } = useAuthContext();

    return (
        <Section className="min-h-screen">
            <FormSection>
                <div className="flex flex-col items-center text-center mb-6">
                    <h1 className="font-bold text-2xl">Welcome Back 👋</h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        Login to continue to your account
                    </p>
                </div>
                <Form {...formLogin}>
                    <form onSubmit={formLogin.handleSubmit(onSubmitLogin)} className="space-y-4">
                        {LabelLogin.flatMap((field) => {
                            if (field.type === "password") {
                                return (
                                    <React.Fragment key={field.name}>
                                        <FieldFormInput
                                            form={formLogin}
                                            name={field.name}
                                            label={field.label}
                                            placeholder={field.placeholder}
                                            type={field.type}
                                        />
                                    </React.Fragment>
                                )
                            }

                            return (
                                <React.Fragment key={field.name}>
                                    <FieldFormInput
                                        form={formLogin}
                                        name={field.name}
                                        label={field.label}
                                        placeholder={field.placeholder}
                                    />
                                </React.Fragment>
                            )
                        })}
                        <Button
                            className="cursor-pointer font-bold w-full flex justify-center items-center gap-2"
                            type="submit"
                            disabled={!formLogin.formState.isValid || loginPending}
                        >
                            {loginPending ? (
                                <>
                                    <Spinner />
                                    <span>Loading...</span>
                                </>) :(
                                    "Login"
                                )}
                        </Button>
                    </form>
                </Form>
                <div className="flex flex-col items-center gap-6">
                    <div className="flex items-center w-full gap-4 text-muted-foreground">
                        <div className="w-full">
                            <Separator />
                        </div>
                        <span className="text-sm">OR</span>
                        <div className="w-full">
                            <Separator />
                        </div>
                    </div>
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full flex items-center justify-center gap-2 font-semibold border-gray-300 hover:bg-gray-50 cursor-pointer"
                        onClick={handleGoogleLogin}
                    >
                        <FcGoogle className="size-5" />
                        Continue with Google
                    </Button>

                    <div className="flex gap-1 items-center">
                        <p className="text-muted-foreground text-sm">
                            Don’t have an account?
                        </p>
                        <Link
                            to="/auth/signup"
                            className="text-blue-600 text-sm underline italic"
                        >
                            Sign up
                        </Link>
                    </div>
                </div>
            </FormSection>
        </Section>
    );
}