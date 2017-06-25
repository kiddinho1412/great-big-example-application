import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditorPage } from './editor.page';
import { AddPage } from './add.page';
import { EditorGuard } from './editor.guard';
import { UserRouteAccessService } from '../../../shared';

const routes: Routes = [
    {
        path: 'editor',
        component: AddPage,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'greatBigExampleApplicationApp.blog.home.title'
        },
        // canActivate: [UserRouteAccessService, EditorGuard]
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'editor/:slug',
        component: EditorPage,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'greatBigExampleApplicationApp.blog.home.title'
        },
        // canActivate: [UserRouteAccessService, EditorGuard]
        canActivate: [UserRouteAccessService]
    }
];

export const routedComponents = [
    AddPage,
    EditorPage];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EditorRouting { }
