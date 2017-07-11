/**
 * @module MealsModule
 * @preferred
 */ /** */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireOfflineModule } from 'angularfire2-offline';

import { MealsRouting } from './meals.routing';
import { MealsPage } from './meals.page';
/**
 * @whatItDoes The root module class that is bootstraped by the `main.ts` file.
 * @see [Angular 2 docs - the application root module](https://angular.io/docs/ts/latest/guide/ngmodule.html#root-module)
 */
@NgModule({
    declarations: [
        MealsPage
    ],
    imports: [
        AngularFireOfflineModule,
        MealsRouting,
        BrowserModule
    ]
})
export class MealsModule { }
