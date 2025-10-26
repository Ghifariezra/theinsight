import { Spinner } from "@/_components/ui/spinner";

export default function LoadingPage() {
    return (
        <div className="flex flex-col justify-center items-center h-screen gap-4">
            <Spinner className="size-8 text-muted-foreground" />
            <p className="text-sm font-medium text-muted-foreground">Loading...</p>
        </div>
    );
}