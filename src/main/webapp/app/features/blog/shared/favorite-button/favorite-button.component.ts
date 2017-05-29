import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../../../core/store';
import { Article } from '../../../../core/store/article/article.model';

@Component({
    selector: 'favorite-button',
    templateUrl: './favorite-button.component.html'
})
export class FavoriteButtonComponent implements OnInit {
    constructor(
        private store: Store<fromRoot.RootState>,
        private router: Router
    ) { }

    @Input() article: Article;
    @Output() onToggle = new EventEmitter<boolean>();
    isSubmitting = false;

    ngOnInit() {

    }

    toggleFavorite() {
        this.isSubmitting = true;

        this.userService.isAuthenticated.subscribe(
            (authenticated) => {
                // Not authenticated? Push to login screen
                if (!authenticated) {
                    this.router.navigateByUrl('/login');
                    return;
                }

                // Favorite the article if it isn't favorited yet
                if (!this.article.favorited) {
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
        )


    }

}
