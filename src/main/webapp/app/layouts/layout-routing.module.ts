import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { navbarRoute } from '../app.route';
import { errorRoute } from './';

const LAYOUT_ROUTES = [
    navbarRoute,
    { path: 'legal', loadChildren: '../features/legal/legal.module#LegalModule' },
    { path: 'meals', loadChildren: '../features/meals/meals.module#MealsModule' },
    ...errorRoute
];

@NgModule({
    imports: [
        RouterModule.forRoot(LAYOUT_ROUTES, { useHash: true })
    ],
    exports: [
        RouterModule
    ]
})
export class LayoutRoutingModule { }
