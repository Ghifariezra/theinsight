import { Link } from "react-router";
import { MenuData } from '@/_data/navbar/menu';
import { useAuthContext } from "@/_hooks/auth/useAuthContext";
import { Button } from '@/_components/ui/button';

export default function MenuComponent() {
    const {
        isAuthenticated
    } = useAuthContext();
    const data = MenuData({ authenticated: isAuthenticated });

    return (
        <>
            {data.map((item, index) => (
                <li key={index} className="hover:text-muted-foreground font-semibold">
                    {item.title === "Get Started" ? (
                        <Button
                            className="font-bold rounded-full cursor-pointer"
                            asChild
                        >
                            <Link to={item.href}>{item.title}</Link>
                        </Button>
                    ) : (
                        <Link
                            to={{
                                pathname: item.href,
                            }}
                        >
                            {item.title}
                        </Link>
                    )}
                </li>
            ))}
        </>
    );
}