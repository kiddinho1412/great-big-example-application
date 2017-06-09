import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import * as SliceActions from '../../../core/store/slice/slice.actions';
import { slices } from '../../../core/store/util';
import * as fromRoot from '../../../core/store';
import { Profile } from '../../../core/store/profile/profile.model';
import { User } from '../../../core/store/user/user.model';

@Component({
    selector: 'profile-page',
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit, OnDestroy {
    user$: Observable<User>;
    userSub: Subscription;
    constructor(
        private store: Store<fromRoot.RootState>,
        private route: ActivatedRoute
    ) { }

    profile: Profile;
    currentUser: User;
    isUser: boolean;

    ngOnInit() {
        this.user$ = this.store.select(fromRoot.getUserState);
        this.route.data.subscribe(
            (data: { profile: Profile }) => {
                this.profile = data.profile;
                // Load the current user's data.
                this.userSub = this.user$.subscribe(
                    (userData: User) => {
                        this.currentUser = userData;
                        this.isUser = (userData.login === this.profile.username);
                    }
                );
            }
        );



    }

    // onToggleFollowing(following: boolean) {
    //     this.profile.following = following;
    // }

    ngOnDestroy() {
        this.userSub && this.userSub.unsubscribe();
    }

}
