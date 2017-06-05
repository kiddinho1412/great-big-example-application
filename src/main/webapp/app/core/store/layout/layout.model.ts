
import { BooksPageLayout, initialBooksPageLayout } from '../../../features/books/books.layout';
import { BerniePageLayout, initialBerniePageLayout } from '../../../features/bernie/bernie.layout';
import { BlogPageLayout, initialBlogPageLayout } from '../../../features/blog/blog.layout';
import { HeroesDashboardLayout, initialHeroesDashboardPageLayout } from '../../../features/heroes/heroes.layout';

export interface Layout {
    booksPage: BooksPageLayout;
    blogPage: BlogPageLayout;
    berniePage: BerniePageLayout;
    heroesDashboardPage: HeroesDashboardLayout;
    msg: string;
}

export function initialLayout() {
    return {
        booksPage: initialBooksPageLayout,
        blogPage: initialBlogPageLayout,
        berniePage: initialBerniePageLayout,
        heroesDashboardPage: initialHeroesDashboardPageLayout,
        msg: ''
    };
}
