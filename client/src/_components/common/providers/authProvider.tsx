import {
    useAuth,
    AuthContext
} from "@/_hooks/auth/useAuthContext";
import type { ChildrenProps } from "@/_types/childrenProps";

export default function AuthProvider({ children }: ChildrenProps) {
    const auth = useAuth();

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
