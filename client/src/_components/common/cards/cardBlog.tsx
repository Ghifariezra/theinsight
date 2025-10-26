import { memo } from "react";
import {
    Card,
    CardContent,
    CardAction,
    // CardDescription,
    CardFooter,
    // CardHeader,
    // CardTitle,
} from "@/_components/ui/card";
import parse from "html-react-parser";
import { LikeButton } from "@/_components/common/buttons/likes";
import type { BlogBySlug } from "@/_types/blogPayload";

type CardBlogProps = {
    article: BlogBySlug, 
    handleBlogLike: (slug: string) => void, 
    likedSlugs: Array<string>
}

export const CardBlog = memo(({ article, handleBlogLike, likedSlugs }: CardBlogProps) => {
    return (
        <Card className="shadow-none">
            {/* <CardHeader>
                <div className="flex flex-col gap-4">
                    <div className="aspect-video overflow-hidden rounded-md">
                        <img
                            src="https://picsum.photos/800/450"
                            alt={article.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <CardTitle className="text-2xl">{article.title}</CardTitle>
                        <CardDescription className="text-sm">
                            {article.description}
                        </CardDescription>
                    </div>
                </div>
            </CardHeader> */}
            <CardContent>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                    {parse(article.content, {
                        replace: (domNode) => {
                            // ✅ Type guard untuk Element nodes
                            if (domNode instanceof Element && domNode.type === 'tag') {
                                // Block dangerous tags
                                if (domNode.name === 'script' || domNode.name === 'iframe') {
                                    return <></>;
                                }

                                // Remove event handlers (onclick, onerror, etc)
                                if (domNode.attribs) {
                                    const cleanAttribs = { ...domNode.attribs };
                                    Object.keys(cleanAttribs).forEach(attr => {
                                        if (attr.startsWith('on')) {
                                            delete cleanAttribs[attr];
                                        }
                                    });

                                    console.log(cleanAttribs);
                                    domNode.attribs = cleanAttribs;
                                }
                            }
                            // Return undefined to continue with default behavior
                            return undefined;
                        }
                    })}
                </div>
            </CardContent>
            <CardFooter>
                <CardAction>
                    <LikeButton
                        slug={article.slug}
                        handleBlogLike={() => handleBlogLike(article.slug)}
                        likedSlugs={likedSlugs}
                        likeCount={article.likes.length}
                    />
                </CardAction>
            </CardFooter>
        </Card>
    );
});