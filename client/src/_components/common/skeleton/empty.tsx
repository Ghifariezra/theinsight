// import { Button } from "@/_components/ui/button";
import {
    Empty,
    // EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/_components/ui/empty";
import { Ban } from "lucide-react";
import { memo } from "react";

export const EmptySkeleton = memo(() => {
    return (
        <Empty className="min-h-screen">
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <Ban />
                </EmptyMedia>
                <EmptyTitle>No Data Available</EmptyTitle>
                <EmptyDescription>
                    We couldn’t find any data to display at the moment.
                    Please check back later or add new data to get started.
                </EmptyDescription>
            </EmptyHeader>
            {/* <EmptyContent>
                <Button>Add New Data</Button>
            </EmptyContent> */}
        </Empty>
    );
});
