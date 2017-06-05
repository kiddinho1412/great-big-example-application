import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import * as fromRoot from '../../../core/store';
import { Article } from '../../../core/store/article/article.model';
import { Account, Principal } from '../../../shared';
import { User } from '../../../core/store/user/user.model';
import { Tag } from '../../../core/store/tag/tag.model';

@Component({
    selector: 'home-page',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.css']
})
export class HomePage implements OnInit, OnDestroy {
    user$: Observable<User>;
    userSub: Subscription;
    isAuthenticated: boolean;
    tags$: Observable<Tag>;
    tags: Array<string> = [];
    tagsLoaded = false;

    constructor(
        private principal: Principal,
        private store: Store<fromRoot.RootState>,
        private router: Router,
    ) { }

    ngOnInit() {
        this.user$ = this.store.select(fromRoot.getUserState);
        this.tags$ = this.store.select(fromRoot.getTags);
        this.userSub = this.user$.subscribe((user) => {
            // set the article list accordingly
            if (this.principal.isAuthenticated()) {
                this.setListTo('feed');
            } else {
                this.setListTo('all');
            }
        });

        this.tagsService.getAll()
            .subscribe((tags) => {
                this.tags = tags;
                this.tagsLoaded = true;
            });
    }

    setListTo(type = '', filters: Object = {}) {
        // If feed is requested but user is not authenticated, redirect to login
        if (type === 'feed' && !this.isAuthenticated) {
            this.router.navigateByUrl('/login');
            return;
        }

        // Otherwise, set the list object
        this.listConfig = { type: type, filters: filters };
    }

    ngOnDestroy() {
        this.userSub && this.userSub.unsubscribe();
    }
}
