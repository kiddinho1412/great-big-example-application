import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../../../core/store';
import { Article } from '../../../../core/store/article/article.model';
import { Profile } from '../../../../core/store/profile/profile.model';
import { User } from '../../../../core/store/user/user.model';
import { Principal } from '../../../../shared';
import { slices } from '../../../../core/store/util';
import * as ArticleActions from '../../../../core/store/article/article.actions';

@Component({
    selector: 'favorite-button',
    templateUrl: './favorite-button.component.html'
})
export class FavoriteButtonComponent implements OnInit {
    identity$: Promise<Account>;
    constructor(
        private principal: Principal,
        private store: Store<fromRoot.RootState>,
        private router: Router
    ) { }

    @Input() article: Article;
    @Output() onToggle = new EventEmitter<boolean>();
    isSubmitting = false;

    ngOnInit() {
        this.identity$ = this.principal.identity();
        this.
    }

    toggleFavorite() {
        this.isSubmitting = true;
        if (!this.principal.isAuthenticated()) {
            this.router.navigateByUrl('/login');
            return;
        }

        // Favorite the article if it isn't favorited yet
        if (!this.article.favorited) {
            this.store.dispatch(new ArticleActions.Favorite(slices.ARTICLE, { route: '/articles/' + this.article.slug + '/favorite' }));


            this.articlesService.favorite(this.article.slug)
                .subscribe(
                data => {
                    this.isSubmitting = false;
                    this.onToggle.emit(true);
                },
                err => this.isSubmitting = false
                );

            // Otherwise, unfavorite the article
        } else {
            this.articlesService.unfavorite(this.article.slug)
                .subscribe(
                data => {
                    this.isSubmitting = false;
                    this.onToggle.emit(false);
                },
                err => this.isSubmitting = false
                );
        }



    }

}
