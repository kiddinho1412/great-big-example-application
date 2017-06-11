import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, DataUtils } from 'ng-jhipster';

import { UserCustom } from './user-custom.model';
import { UserCustomPopupService } from './user-custom-popup.service';
import { UserCustomService } from './user-custom.service';
import { User, UserService } from '../../shared';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-user-custom-dialog',
    templateUrl: './user-custom-dialog.component.html'
})
export class UserCustomDialogComponent implements OnInit {

    userCustom: UserCustom;
    authorities: any[];
    isSaving: boolean;

    users: User[];

    usercustoms: UserCustom[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: DataUtils,
        private alertService: AlertService,
        private userCustomService: UserCustomService,
        private userService: UserService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.userCustomService.query()
            .subscribe((res: ResponseWrapper) => { this.usercustoms = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, userCustom, field, isImage) {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            if (isImage && !/^image\//.test(file.type)) {
                return;
            }
            this.dataUtils.toBase64(file, (base64Data) => {
                userCustom[field] = base64Data;
                userCustom[`${field}ContentType`] = file.type;
            });
        }
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.userCustom.id !== undefined) {
            this.subscribeToSaveResponse(
                this.userCustomService.update(this.userCustom), false);
        } else {
            this.subscribeToSaveResponse(
                this.userCustomService.create(this.userCustom), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<UserCustom>, isCreated: boolean) {
        result.subscribe((res: UserCustom) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: UserCustom, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'greatBigExampleApplicationApp.userCustom.created'
            : 'greatBigExampleApplicationApp.userCustom.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'userCustomListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }

    trackUserCustomById(index: number, item: UserCustom) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-user-custom-popup',
    template: ''
})
export class UserCustomPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userCustomPopupService: UserCustomPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.userCustomPopupService
                    .open(UserCustomDialogComponent, params['id']);
            } else {
                this.modalRef = this.userCustomPopupService
                    .open(UserCustomDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
