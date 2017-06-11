import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, EventManager } from 'ng-jhipster';

import { UserCustom } from './user-custom.model';
import { UserCustomPopupService } from './user-custom-popup.service';
import { UserCustomService } from './user-custom.service';

@Component({
    selector: 'jhi-user-custom-delete-dialog',
    templateUrl: './user-custom-delete-dialog.component.html'
})
export class UserCustomDeleteDialogComponent {

    userCustom: UserCustom;

    constructor(
        private userCustomService: UserCustomService,
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private eventManager: EventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.userCustomService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'userCustomListModification',
                content: 'Deleted an userCustom'
            });
            this.activeModal.dismiss(true);
        });
        this.alertService.success('greatBigExampleApplicationApp.userCustom.deleted', { param : id }, null);
    }
}

@Component({
    selector: 'jhi-user-custom-delete-popup',
    template: ''
})
export class UserCustomDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userCustomPopupService: UserCustomPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.userCustomPopupService
                .open(UserCustomDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
