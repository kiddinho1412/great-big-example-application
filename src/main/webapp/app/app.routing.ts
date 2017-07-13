import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { errorRoute } from './layouts';
import { NavbarComponent } from './layouts/navbar/navbar.component';

const routes: Routes = [
    { path: '', component: NavbarComponent, outlet: 'navbar' },
    { path: 'legal', loadChildren: './features/legal/legal.module#LegalModule' },
    { path: 'meals', loadChildren: './features/meals/meals.module#MealsModule' },
    ...errorRoute
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: true })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRouting { }
