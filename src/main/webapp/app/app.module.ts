import './vendor';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ng2-webstorage';
import { AngularFireOfflineModule } from 'angularfire2-offline';

import { GreatBigExampleApplicationSharedModule, UserRouteAccessService } from './shared';
import { GreatBigExampleApplicationAdminModule } from './admin/admin.module';
import { GreatBigExampleApplicationAccountModule } from './account/account.module';
import { GreatBigExampleApplicationEntityModule } from './entities/entity.module';
import { GreatBigExampleApplicationHomeModule } from './features/home/home.module';
import { StoreLogMonitorModule } from '@ngrx/store-log-monitor';
import { TranslateModule } from '@ngx-translate/core';

import { customHttpProvider } from './core/interceptor/http.provider';
import { PaginationConfig } from './core/config/uib-pagination.config';
import { FeaturesModule } from './features/features.module';
import { CoreModule } from './core/core.module';
import { AppConfig } from './app.config';
import { AppRouting } from './app.routing';

import { MealsModule } from './features/meals/meals.module'; // for the timer
import { LayoutsModule } from './layouts/layouts.module';
import { JhiMainComponent, ProfileService } from './layouts';

// jhipster-needle-angular-add-module-import JHipster will add new module here
/** TODO: remove when work-around is not needed*/
import 'hammerjs';

@NgModule({
    imports: [
        BrowserModule,
        AppRouting,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-' }),
        GreatBigExampleApplicationSharedModule,
        GreatBigExampleApplicationAdminModule,
        GreatBigExampleApplicationAccountModule,
        GreatBigExampleApplicationEntityModule,
        GreatBigExampleApplicationHomeModule,
        FeaturesModule,
        AngularFireOfflineModule,
        CoreModule.forRoot(),
        StoreLogMonitorModule,
        TranslateModule.forRoot(),
        MealsModule,
        LayoutsModule
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
    ],
    providers: [
        AppConfig,
        ProfileService,
        // customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [JhiMainComponent]
})
export class GreatBigExampleApplicationAppModule { }
