import {
    Html,
    Body,
    Head,
    Container,
    Section,
    Text,
    Tailwind,
    Hr,
    render
} from "@react-email/components";

interface VerifyEmailProps {
    userName?: string;
    verificationCode: string;
}

export default async function RenderVerifyEmail({
    userName = "User",
    verificationCode,
}: VerifyEmailProps): Promise<string> {
    return await render(
        <VerifyEmail userName={userName} verificationCode={verificationCode} />
    );
}

function VerifyEmail({
    userName = "User",
    verificationCode,
}: VerifyEmailProps) {
    return (
        <Html>
            <Head />
            <Tailwind>
                <Body className="bg-gray-50 font-sans text-gray-800">
                    <Container className="max-w-lg mx-auto bg-white rounded-2xl shadow p-8">
                        <Section className="text-center mb-6">
                            <Text className="text-2xl font-bold text-indigo-600">
                                Email Verification
                            </Text>
                            <Text className="text-gray-600 mt-2">
                                Hi <span className="font-semibold">{userName}</span>,<br />
                                Use the code below to verify your email.
                            </Text>
                        </Section>

                        <Section className="text-center my-8">
                            <Text className="text-4xl tracking-widest font-semibold text-gray-900">
                                {verificationCode}
                            </Text>
                        </Section>

                        <Hr className="my-6 border-gray-200" />

                        <Section className="text-center text-gray-500 text-xs">
                            <Text>
                                This code will expire in 1 minutes. If you didn’t request this,
                                please ignore this email.
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}
