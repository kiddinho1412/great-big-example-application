import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../../core/store';
// import { ApiService } from './api.service';
import { Profile } from '../../../../core/store/profile/profile.model';
import { RESTService } from '../../../../core/services/rest.service';

@Injectable()
export class ProfilesService {
    constructor(
        private store: Store<fromRoot.RootState>,
        // private apiService: ApiService
    ) { }

    get(username: string): Observable<Profile> {

        return this.apiService.get('/profiles/' + username)
            .map((data: { profile: Profile }) => data.profile);
    }

    follow(username: string): Observable<Profile> {
        return this.apiService.post('/profiles/' + username + '/follow')
    }

    unfollow(username: string): Observable<Profile> {
        return this.apiService.delete('/profiles/' + username + '/follow')
    }

}
