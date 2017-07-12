import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ng2-webstorage';

import { GreatBigExampleApplicationSharedModule, UserRouteAccessService } from './shared';
import { GreatBigExampleApplicationHomeModule } from './home/home.module';
import { GreatBigExampleApplicationAdminModule } from './admin/admin.module';
import { GreatBigExampleApplicationAccountModule } from './account/account.module';
import { GreatBigExampleApplicationEntityModule } from './entities/entity.module';
import { StoreLogMonitorModule } from '@ngrx/store-log-monitor';
import { TranslateModule } from '@ngx-translate/core';

import { customHttpProvider } from './core/interceptor/http.provider';
import { PaginationConfig } from './core/config/uib-pagination.config';
import { FeaturesModule } from './features/features.module';
import { CoreModule } from './core/core.module';
import { AppConfig } from './app.config';

// jhipster-needle-angular-add-module-import JHipster will add new module here
/** TODO: remove when work-around is not needed*/
import 'hammerjs';

import {
    JhiMainComponent,
    LayoutRoutingModule,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent
} from './layouts';

import { LayoutComponent } from './layouts/layout/layout.component';

@NgModule({
    imports: [
        BrowserModule,
        LayoutRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-' }),
        GreatBigExampleApplicationSharedModule,
        GreatBigExampleApplicationHomeModule,
        GreatBigExampleApplicationAdminModule,
        GreatBigExampleApplicationAccountModule,
        GreatBigExampleApplicationEntityModule,
        FeaturesModule,
        CoreModule.forRoot(),
        StoreLogMonitorModule,
        TranslateModule.forRoot()
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        LayoutComponent,
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent
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
