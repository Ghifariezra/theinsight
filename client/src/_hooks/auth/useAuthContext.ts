import { useContext, createContext } from "react";
import { useAuth } from "@/_hooks/auth/useAuth";

type AuthContextType = ReturnType<typeof useAuth>;

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuthContext = () => useContext(AuthContext);
export { useAuth };
