import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../../../core/store';
import { Article } from '../../../../core/store/article/article.model';
import { Comment } from '../../../../core/store/comment/comment.model';
import { User } from '../../../../core/store/user/user.model';

@Component({
    selector: 'jhi-article-comment',
    templateUrl: './article-comment.component.html'
})
export class ArticleCommentComponent implements OnInit {
    user$: Observable<User>;
    article: Article;
    @Input() comment: Comment;
    @Output() deleteComment = new EventEmitter<boolean>();

    canModify: boolean;

    constructor(
        private store: Store<fromRoot.RootState>
    ) { }

    ngOnInit() {
        this.user$ = this.store.select(fromRoot.getUserState);

        // Load the current user's data
        this.user$.subscribe(
            (userData: User) => {
                this.canModify = (userData.login === this.article.author.username);
            }
        );
    }

    deleteClicked() {
        this.deleteComment.emit(true);
    }

}
