import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditorPage } from './editor.page';
import { EditorGuard } from './editor.guard';
import { UserRouteAccessService } from '../../../shared';

const routes: Routes = [
  {
    path: 'editor',
    component: EditorPage,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'greatBigExampleApplicationApp.blog.home.title'
    },
    // canActivate: [UserRouteAccessService, EditorGuard]
  },
  {
    path: 'editor/:slug',
    component: EditorPage,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'greatBigExampleApplicationApp.blog.home.title'
    },
    // canActivate: [UserRouteAccessService, EditorGuard]
  }
];

export const routedComponents = [EditorPage];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditorRouting { }
