import { Component, OnInit } from '@angular/core';

import { User } from '../../../../core/store/user/user.model';
import { Principal } from '../../../../shared/auth/principal.service';

@Component({
    selector: 'jhi-layout-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
    constructor(
        private principal: Principal
    ) { }

    currentUser: User;

    ngOnInit() {
        this.currentUser = this.principal.identity;
    }
}
