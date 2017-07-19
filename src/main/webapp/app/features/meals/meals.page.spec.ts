/* tslint:disable:no-unused-variable */
import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { Route } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { MealsPage } from './meals.page';
import { CoreModule } from '../../core/core.module';
import { HomeComponent } from './home/home.component';
import { RecipeComponent } from './recipe/recipe.component';
import { GreatBigExampleApplicationSharedModule } from '../../shared/shared.module';
import { MealsSharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { RecipeModule } from './recipe/recipe.module';
import { TimerComponent } from './timer/timer.component';
import { StatusBarService } from '../../layouts/status-bar/status-bar.service';
import { TimerService } from './timer/timer.service';

@Component({
    template: ``
})
export class ContainerComponent { }

describe('Meals Page', () => {
    const config: Route[] = [
        {
            path: '',
            component: HomeComponent,
            data: {
                layout: {
                    paddingTop: false,
                    zIndex: 0
                }
            }
        },
        {
            path: 'recipe/pumpkin-chia-seed-cookies',
            component: RecipeComponent
        }
    ];
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes(config),
                GreatBigExampleApplicationSharedModule,
                MealsSharedModule,
                CoreModule,
                HomeModule,
                RecipeModule,
                CoreModule
            ],
            declarations: [
                MealsPage,
                TimerComponent,
                ContainerComponent
            ],
            providers: [
                StatusBarService,
                TimerService
            ]
        });
    });

    it('should create the page', async(() => {
        const fixture = TestBed.createComponent(MealsPage);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
