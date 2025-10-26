import type { ChildrenProps } from "@/_types/childrenProps";

export default function FormSection({ children }: ChildrenProps) {
    return (
        <div className="flex flex-col gap-6 max-w-md w-full mx-auto p-8 border rounded-2xl shadow">
            {children}
        </div>
    );
}