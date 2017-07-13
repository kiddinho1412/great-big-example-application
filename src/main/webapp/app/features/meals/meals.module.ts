/**
 * @module MealsModule
 * @preferred
 */ /** */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireOfflineModule } from 'angularfire2-offline';
import { CommonModule } from '@angular/common';

import { GreatBigExampleApplicationSharedModule } from '../../shared/shared.module';
import { GreatBigExampleApplicationAppModule } from '../../app.module';
import { MealsRouting } from './meals.routing';
import { MealsPage } from './meals.page';
import { TimerComponent } from './timer/timer.component';
import { TimerService } from './timer/timer.service';
import { SharedModule } from './shared/shared.module';

/**
 * @whatItDoes The module for the meals feature
 * @see [Angular 2 docs - the feature module](https://angular.io/guide/ngmodule#feature-modules)
 */
@NgModule({
    imports: [
        GreatBigExampleApplicationSharedModule,
        SharedModule,
        AngularFireOfflineModule,
        MealsRouting,
        CommonModule
    ],
    declarations: [
        MealsPage,
        TimerComponent
    ],
    providers: [
        TimerService
    ]
})
export class MealsModule { }
