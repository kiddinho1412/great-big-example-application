import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import * as fromRoot from '../../../../core/store';
import { Article } from '../../../../core/store/article/article.model';
import { Layout } from '../../../../core/store/layout/layout.model';
import { BlogPageLayout } from '../../blog.layout';
import * as SliceActions from '../../../../core/store/slice/slice.actions';
import { slices } from '../../../../core/store/util';

@Component({
    selector: 'jhi-article-list',
    templateUrl: './article-list.component.html'
})
export class ArticleListComponent implements OnDestroy {
    articles$: Observable<Article[]>;
    articlesSub: Subscription;
    query: BlogPageLayout;
    articles: Article[];
    loading = false;
    currentPage = 1;
    totalPages: Array<number> = [1];

    constructor(
        private store: Store<fromRoot.RootState>
    ) { }

    @Input() limit: number;
    @Input()
    set config(config: BlogPageLayout) {
        if (config) {
            this.query = config;
            this.currentPage = 1;
            this.runQuery();
        }
    }

    ngOninit() {
        this.articles$ = this.store.select(fromRoot.getArticlesForQuery);
        this.articlesSub = this.articles$.subscribe((articles) => {
            this.loading = false;
            this.articles = articles;

            // Used from http://www.jstips.co/en/create-range-0...n-easily-using-one-line/
            this.totalPages = Array.from(new Array(Math.ceil(articles.length / this.limit)), (val, index) => index + 1);
        })
    }

    setPageTo(pageNumber) {
        this.currentPage = pageNumber;
        this.runQuery();
    }

    runQuery() {
        // Create limit and offset filter (if necessary)
        if (this.limit) {
            this.query.filters.limit = this.limit;
            this.query.filters.offset = (this.limit * (this.currentPage - 1))
        }

        this.store.dispatch(new SliceActions.Update(slices.LAYOUT, ['blogPage'], this.query));
        this.loading = true;
        this.articles = [];

        // this.articlesService.query(this.query)
        //     .subscribe(data => {
        //         this.loading = false;
        //         this.articles = data.articles;

        //         // Used from http://www.jstips.co/en/create-range-0...n-easily-using-one-line/
        //         this.totalPages = Array.from(new Array(Math.ceil(data.articlesCount / this.limit)), (val, index) => index + 1);
        //     });
    }

    ngOnDestroy() {
        this.articlesSub && this.articlesSub.unsubscribe();
    }
}
