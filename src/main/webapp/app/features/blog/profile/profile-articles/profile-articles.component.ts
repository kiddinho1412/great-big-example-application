import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as SliceActions from '../../../../core/store/slice/slice.actions';
import { slices } from '../../../../core/store/util';
import * as fromRoot from '../../../../core/store';
import { Profile } from '../../../../core/store/profile/profile.model';
import { Layout } from '../../../../core/store/layout/layout.model';

@Component({
    selector: 'profile-articles',
    templateUrl: './profile-articles.component.html'
})
export class ProfileArticlesComponent implements OnInit {
    layout$: Observable<Layout>;

    constructor(
        private store: Store<fromRoot.RootState>,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    profile: Profile;

    ngOnInit() {
        this.layout$ = this.store.select(fromRoot.getLayoutState);
        this.route.parent.data.subscribe(
            (data: { profile: Profile }) => {
                this.profile = data.profile;
                this.store.dispatch(new SliceActions.Update(slices.LAYOUT, ['blogPage', 'filters', 'author'], this.profile.username));
            }
        );
    }

}
