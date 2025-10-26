import {
    useHomeContext
} from "@/_hooks/blog/useHomeContext";
import { SearchInput } from "@/_components/common/inputs/searchInput";
import { CardExplore } from "@/_components/common/cards/cardExplore";
import { Label } from "@/_components/ui/label";
import { ExploreSkeleton } from "@/_components/common/skeleton/explore";
import { EmptySkeleton } from "@/_components/common/skeleton/empty";

export default function Explore() {
    const {
        allBlogsFiltered,
        allBlogsLoading,
        allBlogsError,
        setSearchInput,
        handleBlogLike,
        likedSlugs
    } = useHomeContext();

    if (allBlogsLoading) return <ExploreSkeleton />;
    if (allBlogsError) return <ExploreSkeleton />;

    console.log(likedSlugs);
    console.log(allBlogsFiltered);

    return (
        <section className="flex flex-col gap-6 p-6">
            <div className="flex flex-col gap-4">
                <Label
                    htmlFor="search"
                    className="text-sm leading-none font-semibold"
                >
                    Search
                </Label>
                <SearchInput
                    id="search"
                    setSearchInput={setSearchInput}
                />
            </div>
            <div className="flex flex-col gap-4">
                {allBlogsFiltered.length > 0 ? (
                    <CardExplore
                        blogFiltered={allBlogsFiltered}
                        handleBlogLike={handleBlogLike}
                        likedSlugs={likedSlugs}
                    />
                ) : (
                    <EmptySkeleton />
                )}
            </div>
        </section>
    );
}