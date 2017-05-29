import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';

const homeRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: '',
        component: HomeComponent,
        resolve: {
            isAuthenticated: HomeAuthResolver
        }
    }
]);

@NgModule({
    imports: [
        homeRouting,
        SharedModule
    ],
    declarations: [
        HomeComponent
    ],
    providers: [
    ]
})
export class HomeModule { }
