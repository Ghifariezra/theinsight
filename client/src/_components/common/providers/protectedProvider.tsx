import { useEffect } from "react";
import { useAuthContext } from "@/_hooks/auth/useAuthContext";
import { useNavigate, useLocation } from "react-router-dom";

export default function ProtectedProvider({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { 
        isAuthenticated,
        isVerified,
        // payload
     } = useAuthContext();

    useEffect(() => {
        const protectedPaths = ["/dashboard", "/auth/verify", "/write"];
        const publicPaths = ["/auth/login", "/auth/signup", "/"];

        if (!isAuthenticated && !isVerified && protectedPaths.includes(location.pathname)) {
            navigate("/auth/login", { replace: true });
        } else if (isAuthenticated && isVerified && publicPaths.includes(location.pathname)) {
            navigate('/dashboard', { replace: true });
        } else if (isAuthenticated && !isVerified && publicPaths.includes(location.pathname)) {
            navigate('/auth/verify', { replace: true });
        }

    }, [navigate, isAuthenticated, isVerified, location.pathname]);

    return <>{children}</>;
}
