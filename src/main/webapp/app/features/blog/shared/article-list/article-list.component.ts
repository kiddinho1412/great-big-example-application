import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../../../core/store';
import { Article } from '../../../../core/store/article/article.model';
import { Layout } from '../../../../core/store/layout/layout.model';

@Component({
    selector: 'jhi-article-list',
    templateUrl: './article-list.component.html'
})
export class ArticleListComponent {
    articles$: Observable<Article[]>;
    query: ArticleListConfig;
    articles: Article[];
    loading = false;
    currentPage = 1;
    totalPages: Array<number> = [1];

    constructor(
        private store: Store<fromRoot.RootState>
    ) { }

    @Input() limit: number;
    @Input()
    set config(config: ArticleListConfig) {
        if (config) {
            this.query = config;
            this.currentPage = 1;
            this.runQuery();
        }
    }

    ngOninit() {
        this.articles$ = this.store.select(fromRoot.getArticles);
    }

    setPageTo(pageNumber) {
        this.currentPage = pageNumber;
        this.runQuery();
    }

    runQuery() {
        this.loading = true;
        this.articles = [];

        // Create limit and offset filter (if necessary)
        if (this.limit) {
            this.query.filters.limit = this.limit;
            this.query.filters.offset = (this.limit * (this.currentPage - 1))
        }

        this.articlesService.query(this.query)
            .subscribe(data => {
                this.loading = false;
                this.articles = data.articles;

                // Used from http://www.jstips.co/en/create-range-0...n-easily-using-one-line/
                this.totalPages = Array.from(new Array(Math.ceil(data.articlesCount / this.limit)), (val, index) => index + 1);
            });
    }
}
