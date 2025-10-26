export const MenuData = ({ authenticated }: { authenticated: boolean }) => {
    if (authenticated) {
        return [
            {
                title: "Explore",
                href: "/explore",
            },
            {
                title: "Write",
                href: "/write",
            },
        ];
    }

    return [
        {
            title: "Explore",
            href: "/explore",
        },
        {
            title: "Write",
            href: "/write",
        },
        {
            title: "Sign In",
            href: "/auth/login",
        },
        {
            title: "Get Started",
            href: "/auth/signup",
        },
    ]
}