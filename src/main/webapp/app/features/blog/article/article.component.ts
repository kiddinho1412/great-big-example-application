import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { EventManager } from 'ng-jhipster';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import * as fromRoot from '../../../core/store';
import { Article } from '../../../core/store/article/article.model';
import { Comment } from '../../../core/store/comment/comment.model';
import { User } from '../../../core/store/user/user.model';
import { slices } from '../../../core/store/util';
import * as EntityActions from '../../../core/store/entity/entity.actions';
import { AlertService } from 'ng-jhipster';

@Component({
    selector: 'jhi-article-component',
    templateUrl: './article.component.html'
})
export class ArticleComponent implements OnInit, OnDestroy {
    user$: Observable<User>;
    comments$: Observable<Comment[]>;
    commentsSub: Subscription;
    article: Article;
    currentUser: User;
    canModify: boolean;
    comments: Comment[];
    commentControl = new FormControl();
    commentFormErrors = {};
    isSubmitting = false;
    isDeleting = false;

    constructor(
        private eventManager: EventManager,
        private store: Store<fromRoot.RootState>,
        private alertService: AlertService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.user$ = this.store.select(fromRoot.getUserState);
        this.comments$ = this.store.select(fromRoot.getCommensForSelectedArticle);
        this.commentsSub = this.comments$.subscribe((comments) => this.comments = comments);

        // Retreive the prefetched article
        this.route.data.subscribe(
            (data: { article: Article }) => {
                this.article = data.article;

                // Load the comments on this article
                // this.populateComments();
            }
        );

        // Load the current user's data
        this.user$.subscribe(
            (userData: User) => {
                this.currentUser = userData;

                this.canModify = (this.currentUser.login === this.article.author.username);
            }
        );
    }

    // onToggleFavorite(favorited: boolean) {
    //     this.article.favorited = favorited;

    //     if (favorited) {
    //         this.article.favoritesCount++;
    //     } else {
    //         this.article.favoritesCount--;
    //     }
    // }

    // onToggleFollowing(following: boolean) {
    //     this.article.author.following = following;
    // }

    deleteArticle() {
        this.isDeleting = true;
        this.store.dispatch(new EntityActions.Delete(slices.ARTICLE, this.article));
        // this.router.navigateByUrl('/');  // TODO handle routing after an update
    }

    // populateComments() {
    //     this.commentsService.getAll(this.article.slug)
    //         .subscribe((comments) => this.comments = comments);
    // }

    addComment() {
        this.isSubmitting = true;
        this.commentFormErrors = {};

        const comment = { articleId: this.article.id, ...this.commentControl.value };
        this.store.dispatch(new EntityActions.Add(slices.COMMENT, comment));
        // this.commentControl.reset(''); // TODO: clear control on success

        // this.commentsService
        //     .add(this.article.slug, commentBody)
        //     .subscribe(
        //     (comment) => {
        //         this.comments.unshift(comment);
        //         this.commentControl.reset('');
        //         this.isSubmitting = false;
        //     },
        //     (errors) => {
        //         this.isSubmitting = false;
        //         this.commentFormErrors = errors;
        //     }
        //     );
    }

    onDeleteComment(comment) {
        this.store.dispatch(new EntityActions.Delete(slices.COMMENT, comment.id));
        // this.commentsService.destroy(comment.id, this.article.slug)
        //     .subscribe(
        //     (success) => {
        //         this.comments = this.comments.filter((item) => item !== comment);
        //     }
        //     );
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    ngOnDestroy() {
        this.commentsSub && this.commentsSub.unsubscribe();
    }
}
