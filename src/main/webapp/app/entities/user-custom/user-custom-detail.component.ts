import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , DataUtils } from 'ng-jhipster';

import { UserCustom } from './user-custom.model';
import { UserCustomService } from './user-custom.service';

@Component({
    selector: 'jhi-user-custom-detail',
    templateUrl: './user-custom-detail.component.html'
})
export class UserCustomDetailComponent implements OnInit, OnDestroy {

    userCustom: UserCustom;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private dataUtils: DataUtils,
        private userCustomService: UserCustomService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInUserCustoms();
    }

    load(id) {
        this.userCustomService.find(id).subscribe((userCustom) => {
            this.userCustom = userCustom;
        });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInUserCustoms() {
        this.eventSubscriber = this.eventManager.subscribe(
            'userCustomListModification',
            (response) => this.load(this.userCustom.id)
        );
    }
}
