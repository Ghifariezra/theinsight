import { memo } from "react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/_components/ui/avatar";

export const AvatarExplore = memo(({
    avatarUrl,
    name
}: {
    avatarUrl: string;
    name: string;
}) => {
    return (
        <div className="flex gap-2 w-fit items-center">
            <Avatar className="w-6 h-6">
                <AvatarImage
                    src={avatarUrl}
                    alt={name}
                />
                <AvatarFallback>
                    {name.charAt(0).toUpperCase()}
                </AvatarFallback>
            </Avatar>
            <h1 className="text-xs sm:text-sm">{name}</h1>
        </div>
    );
});