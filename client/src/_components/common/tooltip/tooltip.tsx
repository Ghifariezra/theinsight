import { memo } from "react"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/_components/ui/tooltip"
import type { ChildrenProps } from "@/_types/childrenProps"

export const TooltipComponent = memo(({ children, info }: ChildrenProps) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                {children}
            </TooltipTrigger>
            <TooltipContent>
                <p>{info}</p>
            </TooltipContent>
        </Tooltip>
    )
});