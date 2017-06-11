import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GreatBigExampleApplicationSharedModule } from '../../shared';
import { GreatBigExampleApplicationAdminModule } from '../../admin/admin.module';
import {
    UserCustomService,
    UserCustomPopupService,
    UserCustomComponent,
    UserCustomDetailComponent,
    UserCustomDialogComponent,
    UserCustomPopupComponent,
    UserCustomDeletePopupComponent,
    UserCustomDeleteDialogComponent,
    userCustomRoute,
    userCustomPopupRoute,
} from './';

const ENTITY_STATES = [
    ...userCustomRoute,
    ...userCustomPopupRoute,
];

@NgModule({
    imports: [
        GreatBigExampleApplicationSharedModule,
        GreatBigExampleApplicationAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        UserCustomComponent,
        UserCustomDetailComponent,
        UserCustomDialogComponent,
        UserCustomDeleteDialogComponent,
        UserCustomPopupComponent,
        UserCustomDeletePopupComponent,
    ],
    entryComponents: [
        UserCustomComponent,
        UserCustomDialogComponent,
        UserCustomPopupComponent,
        UserCustomDeleteDialogComponent,
        UserCustomDeletePopupComponent,
    ],
    providers: [
        UserCustomService,
        UserCustomPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreatBigExampleApplicationUserCustomModule {}
