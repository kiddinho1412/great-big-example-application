import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../../core/store';
import { Profile } from '../../../../core/store/profile/profile.model';
import { Principal } from '../../../../shared/auth/principal.service';
import * as ArticleActions from '../../../../core/store/article/article.actions';
import { slices } from '../../../../core/store/util';

@Component({
    selector: 'jhi-follow-button',
    templateUrl: './follow-button.component.html'
})
export class FollowButtonComponent {
    constructor(
        private store: Store<fromRoot.RootState>,
        private router: Router,
        private principal: Principal
    ) { }

    @Input() profile: Profile;
    // @Output() onToggle = new EventEmitter<boolean>();
    isSubmitting = false;

    toggleFollowing() {
        this.isSubmitting = true;

        // Not authenticated? Push to login screen
        if (!this.principal.isAuthenticated()) {
            this.router.navigateByUrl('/login');
            return;
        }

        // Follow this profile if we aren't already
        if (!this.profile.following) {
            this.store.dispatch(new ArticleActions.Follow());

            // this.profilesService.follow(this.profile.username)
            //     .subscribe(
            //     data => {
            //         this.isSubmitting = false;
            //         this.onToggle.emit(true);
            //     },
            //     err => this.isSubmitting = false
            //     );

            // Otherwise, unfollow this profile
        } else {
            this.store.dispatch(new ArticleActions.Unfollow());
            //     this.profilesService.unfollow(this.profile.username)
            //         .subscribe(
            //         data => {
            //             this.isSubmitting = false;
            //             this.onToggle.emit(false);
            //         },
            //         err => this.isSubmitting = false
            //         );
            // }

        }
    }
}
