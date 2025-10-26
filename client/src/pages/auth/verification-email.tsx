import Section from "@/_components/layout/section";
import FormSection from "@/_components/layout/form";
import { FieldFormInput } from "@/_components/common/inputs/formInput";
import { Button } from "@/_components/ui/button"
import {
    Form
} from "@/_components/ui/form";
import { useAuthContext } from "@/_hooks/auth/useAuthContext";
import { Spinner } from "@/_components/ui/spinner";

export default function VerificationEmail() {
    const {
        formVerification,
        onSubmitVerification,
        verifyPending,
        resendVerificationCode,
        resendPending
    } = useAuthContext();

    return (
        <Section className="min-h-screen">
            <FormSection>
                <div className="flex flex-col gap-1 justify-center items-center">
                    <h1 className="font-bold text-2xl">Verification Email</h1>
                    <p className="text-muted-foreground text-sm">Please check your email to verify your account.</p>
                </div>
                <div className="self-center">
                    <Form {...formVerification}>
                        <form onSubmit={formVerification.handleSubmit(onSubmitVerification)} className="space-y-6">
                            <FieldFormInput
                                form={formVerification}
                                name="pin"
                                label="Verification Code"
                                placeholder="Enter your OTP"
                                type="otp"
                            />
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-center text-xs">
                                    <span>
                                        Didn&apos;t receive the code?
                                    </span>
                                    <Button
                                        onClick={resendVerificationCode}
                                        className="cursor-pointer underline italic text-blue-600 p-0 text-xs"
                                        disabled={resendPending}
                                        variant="link"
                                        type="button"
                                    >
                                        {resendPending ? "Resending..." : "Resend Code"}
                                    </Button>
                                </div>

                                <div className="w-full flex">
                                    <Button
                                        type="submit"
                                        disabled={
                                            !formVerification.formState.isValid || verifyPending
                                        }
                                        className="w-full cursor-pointer flex justify-center items-center gap-2 font-bold"
                                    >
                                        {verifyPending ? (
                                            <>
                                                <Spinner />
                                                <span>Verifying...</span>
                                            </>) : (
                                            "Verify Email"
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </Form>
                </div>
            </FormSection>
        </Section>
    );
}