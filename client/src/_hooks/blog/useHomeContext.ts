import { useContext, createContext } from "react";
import { useBlog } from "@/_hooks/blog/useBlog";

type HomeContextType = ReturnType<typeof useBlog>;

export const HomeContext = createContext<HomeContextType>({} as HomeContextType);

export const useHomeContext = () => useContext(HomeContext);
export { useBlog };
