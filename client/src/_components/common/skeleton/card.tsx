import { Card, CardContent, CardFooter, CardAction } from "@/_components/ui/card";

export const CardBlogSkeleton = () => {
    return (
        <Card className="shadow-none">
            <CardContent>
                <div className="animate-pulse flex flex-col gap-4">
                    {/* Content (simulated paragraphs) */}
                    <div className="space-y-2 mt-2">
                        <div className="h-4 bg-muted rounded-md w-full" />
                        <div className="h-4 bg-muted rounded-md w-5/6" />
                        <div className="h-4 bg-muted rounded-md w-2/3" />
                    </div>
                </div>
            </CardContent>

            <CardFooter>
                <CardAction>
                    {/* Like button skeleton */}
                    <div className="flex items-center gap-2">
                        <div className="h-6 w-6 bg-muted rounded-full" />
                        <div className="h-4 w-10 bg-muted rounded-md" />
                    </div>
                </CardAction>
            </CardFooter>
        </Card>
    );
};
