export interface Blog {
    _id: string;
    title: string;
    description: string;
    author: {
        _id: string;
        name: string;
        avatar: string;
    };
    tags?: string[];
    slug: string;
    likes: string[];
    createdAt: Date;
}

export type BlogBySlug = Omit<
    Blog,
    "_id"
> & {
    imageUrl: string
    content: string
};

export type BlogUpload = Omit<
    Blog,
    "_id" | "author" | "likes" | "createdAt" | "slug"
> & {
    imageUrl?: string
};

export interface UpdateLikesPayload {
    slug: Array<string>;
}