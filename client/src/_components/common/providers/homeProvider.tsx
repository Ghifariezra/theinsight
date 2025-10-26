import {
    useBlog,
    HomeContext
} from "@/_hooks/blog/useHomeContext";
import type { ChildrenProps } from "@/_types/childrenProps";

export default function HomeProvider({ children }: ChildrenProps) {
    const blog = useBlog();

    return <HomeContext.Provider value={blog}>{children}</HomeContext.Provider>;
}
