import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, EventManager } from 'ng-jhipster';

import { Author } from './author.model';
import { AuthorPopupService } from './author-popup.service';
import { AuthorService } from './author.service';

@Component({
    selector: 'jhi-author-delete-dialog',
    templateUrl: './author-delete-dialog.component.html'
})
export class AuthorDeleteDialogComponent {

    author: Author;

    constructor(
        private userCustomService: AuthorService,
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
                content: 'Deleted an author'
            });
            this.activeModal.dismiss(true);
        });
        this.alertService.success('greatBigExampleApplicationApp.author.deleted', { param : id }, null);
    }
}

@Component({
    selector: 'jhi-author-delete-popup',
    template: ''
})
export class AuthorDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userCustomPopupService: AuthorPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.userCustomPopupService
                .open(AuthorDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
