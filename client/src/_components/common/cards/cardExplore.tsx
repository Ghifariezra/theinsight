import { memo } from "react";
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/_components/ui/card";
import { AvatarExplore } from "@/_components/common/avatars/avatarExplore";
import { LikeButton } from "@/_components/common/buttons/likes";
import { Button } from "@/_components/ui/button";
import { Link } from "react-router";
import { convertDatePublish } from "@/_utilities/convertDate";
import type { Blog } from "@/_types/blogPayload";

type CardExploreProps = {
    blogFiltered: Array<Blog>;
    handleBlogLike: (slugValue: string) => Promise<void>;
    likedSlugs: Array<string>
}

export const CardExplore = memo(({
    blogFiltered,
    handleBlogLike,
    likedSlugs
}: CardExploreProps) => {
    return (
        <>
            {blogFiltered.map((blog, index) => (
                <Card key={index}>
                    <CardHeader>
                        <div className="flex flex-col gap-4">
                            {/* Author */}
                            <AvatarExplore
                                avatarUrl={blog.author.avatar}
                                name={blog.author.name}
                            />

                            {/* Title */}
                            <div className="flex flex-col gap-2">
                                <CardTitle className="leading-5">{blog.title}</CardTitle>
                                <CardDescription>{blog.description}</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardFooter>
                        <CardAction className="flex justify-between w-full">
                            <div className="flex flex-row-reverse items-center gap-2 w-fit text-muted-foreground">
                                {/* Likes */}
                                <LikeButton
                                    slug={blog.slug}
                                    handleBlogLike={handleBlogLike}
                                    likedSlugs={likedSlugs}
                                    likeCount={blog.likes.length || 0}
                                />

                                {/* Date */}
                                <span className="text-sm">{convertDatePublish(blog.createdAt)}</span>
                            </div>
                            <Button
                                size={"sm"}
                                asChild
                            >
                                <Link
                                    to={{
                                        pathname: `/blog/${blog.slug}`
                                    }}
                                >
                                    Read More
                                </Link>
                            </Button>
                        </CardAction>
                    </CardFooter>
                </Card>
            ))}
        </>
    );
});