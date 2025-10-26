import { useParams } from 'react-router-dom';
import { useHomeContext } from '@/_hooks/blog/useHomeContext';
import { CardBlog } from '@/_components/common/cards/cardBlog';
import { EmptySkeleton } from '@/_components/common/skeleton/empty';
import { CardBlogSkeleton } from '@/_components/common/skeleton/card';

export default function Blog() {
    const { slug } = useParams();

    const {
        useBlogBySlugQuery,
        handleBlogLike,
        likedSlugs
    } = useHomeContext();

    const {
        data,
        isLoading,
        isError
    } = useBlogBySlugQuery(slug as string);

    // console.log(data);

    return (
        <section className="flex flex-col gap-6 p-6">
            {isLoading && <CardBlogSkeleton />}
            {isError && <p>Error</p>}
            {data && data.content ? <CardBlog 
                article={data}
                handleBlogLike={handleBlogLike}
                likedSlugs={likedSlugs}
            />: <EmptySkeleton />}
        </section>
    );
}