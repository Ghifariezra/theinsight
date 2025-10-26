import { memo } from "react";
import { Skeleton } from "@/_components/ui/skeleton";
import {
    Card,
    CardAction,
    CardFooter,
    CardHeader,
} from "@/_components/ui/card";
import { Label } from "@/_components/ui/label";

export const ExploreSkeleton = memo(() => {
    return (
        <section className="flex flex-col gap-6 p-6">
            {/* Search Section */}
            <div className="flex flex-col gap-4">
                <Label
                    htmlFor="search"
                    className="text-base font-semibold leading-none"
                >
                    Search
                </Label>
                <Skeleton className="h-10 w-full" />
            </div>

            {/* Blog Cards Section */}
            <div className="flex flex-col gap-4">
                {[...Array(3)].map((_, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <div className="flex flex-col gap-4">
                                {/* Author Skeleton */}
                                <div className="flex gap-2 w-fit items-center">
                                    <Skeleton className="w-4 h-4 rounded-full" />
                                    <Skeleton className="h-3 w-24" />
                                </div>

                                {/* Title & Description Skeleton */}
                                <div className="flex flex-col gap-2">
                                    <Skeleton className="h-6 w-3/4" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-2/3" />
                                </div>
                            </div>
                        </CardHeader>
                        <CardFooter>
                            <CardAction className="flex justify-between w-full">
                                <div className="flex items-center gap-2 w-full text-muted-foreground">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-8 w-16" />
                                </div>
                                <Skeleton className="h-8 w-24" />
                            </CardAction>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </section>
    );
});