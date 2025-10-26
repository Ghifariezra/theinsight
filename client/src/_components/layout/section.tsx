import type { ChildrenProps } from "@/_types/childrenProps";

export default function Section({ children, className }: ChildrenProps) {
    return (
        <section className={`${className || ""} flex justify-center items-center py-8`}>
            {children}
        </section>
    )
}