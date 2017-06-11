import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { UserCustomComponent } from './user-custom.component';
import { UserCustomDetailComponent } from './user-custom-detail.component';
import { UserCustomPopupComponent } from './user-custom-dialog.component';
import { UserCustomDeletePopupComponent } from './user-custom-delete-dialog.component';

import { Principal } from '../../shared';

export const userCustomRoute: Routes = [
    {
        path: 'user-custom',
        component: UserCustomComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'greatBigExampleApplicationApp.userCustom.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'user-custom/:id',
        component: UserCustomDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'greatBigExampleApplicationApp.userCustom.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userCustomPopupRoute: Routes = [
    {
        path: 'user-custom-new',
        component: UserCustomPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'greatBigExampleApplicationApp.userCustom.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-custom/:id/edit',
        component: UserCustomPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'greatBigExampleApplicationApp.userCustom.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-custom/:id/delete',
        component: UserCustomDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'greatBigExampleApplicationApp.userCustom.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
