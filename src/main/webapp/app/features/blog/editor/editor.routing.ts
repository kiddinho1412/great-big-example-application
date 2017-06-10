import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditorComponent } from './editor.component';
import { EditorGuard } from './editor.guard';
import { UserRouteAccessService } from '../../../shared';

const routes: Routes = [
    {
        path: 'editor',
        component: EditorComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'greatBigExampleApplicationApp.blog.home.title'
        },
        // canActivate: [UserRouteAccessService, EditorGuard]
    },
    {
        path: 'editor/:slug',
        component: EditorComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'greatBigExampleApplicationApp.blog.home.title'
        },
        // canActivate: [UserRouteAccessService, EditorGuard]
    }
];

export const routedComponents = [EditorComponent];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EditorRouting { }
