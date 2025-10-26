import {memo} from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/_components/ui/popover";
import type { ChildrenProps } from "@/_types/childrenProps";

export const PopoverComponent = memo(({ trigger, children }: ChildrenProps) => {
    return (
        <Popover modal={false}>
            <PopoverTrigger>
                {trigger}
            </PopoverTrigger>
            <PopoverContent
                side="top"
                className="bg-slate-100 max-w-sm w-full space-x-2"
            >
                {children}
            </PopoverContent>
        </Popover>
    );
});