export const convertDatePublish = (createdAt: Date) => {
    return new Date(createdAt).toLocaleDateString(
        "en-US",
        {
            year: "numeric",
            month: "short",
            day: "numeric",
        }
    )
}