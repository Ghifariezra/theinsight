import { memo } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/_components/ui/dropdown-menu";
import type { ChildrenProps } from "@/_types/childrenProps";

export const DropDownComponent = memo(({
    children,
    trigger
}: ChildrenProps) => {
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger>
                {trigger}
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="start"
                className="max-h-56 overflow-y-auto"
            >
                {children}
            </DropdownMenuContent>
        </DropdownMenu>
    )
});