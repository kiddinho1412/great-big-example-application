export interface BlogPageLayout {
    type: string,

    filters: {
        tag?: string,
        author?: string,
        favorited?: string,
        limit?: number,
        offset?: number
    }
}

export const initialBlogPageLayout = {
    type: 'all',

    filters: {}
};
