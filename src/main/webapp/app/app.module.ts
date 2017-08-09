import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ng2-webstorage';
import { AngularFireOfflineModule } from 'angularfire2-offline';

import { DBModule } from '@ngrx/db';
import { GreatBigExampleApplicationSharedModule, UserRouteAccessService } from './shared';
import { GreatBigExampleApplicationAdminModule } from './admin/admin.module';
import { GreatBigExampleApplicationAccountModule } from './account/account.module';
import { GreatBigExampleApplicationEntityModule } from './entities/entity.module';
import { GreatBigExampleApplicationHomeModule } from './features/home/home.module';
// import { StoreLogMonitorModule } from '@ngrx/store-log-monitor';
import { TranslateModule } from '@ngx-translate/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';

import { customHttpProvider } from './core/interceptor/http.provider';
import { PaginationConfig } from './core/config/uib-pagination.config';
import { FeaturesModule } from './features/features.module';
import { CoreModule } from './core/core.module';
import { AppConfig } from './app.config';
import { AppRouting } from './app.routing';
import { MealsModule } from './features/meals/meals.module'; // for the timer
import { LayoutsModule } from './layouts/layouts.module';
import { schema } from './core/store/db';

import { reducers, metaReducers, developmentReducerFactory } from './core/store';

// jhipster-needle-angular-add-module-import JHipster will add new module here
/** TODO: remove when work-around is not needed*/
import 'hammerjs';
import {
  JhiMainComponent,
  // LayoutRoutingModule,
  NavbarComponent,
  FooterComponent,
  ProfileService,
  PageRibbonComponent,
  ActiveMenuDirective,
  ErrorComponent
} from './layouts';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  ApplicationRef
} from '@angular/core';
import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from '@angularclass/hmr';
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
// App is our top level component
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';

import '../styles/styles.scss';
import '../styles/headings.css';
import '../styles/vendor.scss';

const imports = [
  BrowserModule,
  AppRouting,
  // LayoutRoutingModule,
  Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-' }),
  GreatBigExampleApplicationSharedModule,
  GreatBigExampleApplicationAdminModule,
  GreatBigExampleApplicationAccountModule,
  GreatBigExampleApplicationEntityModule,
  GreatBigExampleApplicationHomeModule,
  FeaturesModule,
  AngularFireOfflineModule,
  CoreModule.forRoot(),
  TranslateModule.forRoot(),
  MealsModule,
  LayoutsModule,

  /**
   * StoreModule.forRoot is imported once in the root module, accepting a reducer
   * function or object map of reducer functions. If passed an object of
   * reducers, combineReducers will be run creating your application
   * meta-reducer. This returns all providers for an @ngrx/store
   * based application.
   */
  StoreModule.forRoot(reducers, { metaReducers }),

  /**
   * Store devtools instrument the store retaining past versions of state
   * and recalculating new states. This enables powerful time-travel
   * debugging.
   *
   * To use the debugger, install the Redux Devtools extension for either
   * Chrome or Firefox
   *
   * See: https://github.com/zalmoxisus/redux-devtools-extension
   */
  // There is a fix in the works for a performanc problem when
  // using devtools and router-store together
  // process.env.NODE_ENV ? StoreDevtoolsModule.instrument() : [],

  /**
   * EffectsModule.forRoot() is imported once in the root module and
   * sets up the effects class to be initialized immediately when the
   * application starts.
   *
   * See: https://github.com/ngrx/platform/blob/master/docs/effects/api.md#forroot
   */
  EffectsModule.forRoot([]),

  /**
   * @ngrx/router-store keeps router state up-to-date in the store and uses
   * the store as the single source of truth for the router's state.
   */
  StoreRouterConnectingModule,

  /**
   * Store devtools instrument the store retaining past versions of state
   * and recalculating new states. This enables powerful time-travel
   * debugging.
   *
   * To use the debugger, install the Redux Devtools extension for either
   * Chrome or Firefox
   *
   * See: https://github.com/zalmoxisus/redux-devtools-extension
   */
  // StoreDevtoolsModule.instrumentOnlyWithExtension(), // <-- old way

  /**
   * `provideDB` sets up @ngrx/db with the provided schema and makes the Database
   * service available.
   */
  DBModule.provideDB(schema)
  // jhipster-needle-angular-add-module JHipster will add new module here
];

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

@NgModule({
  imports: [
    imports
  ],
  declarations: [
  ],
  providers: [
    ENV_PROVIDERS,
    APP_PROVIDERS,
    AppConfig,
    ProfileService,
    customHttpProvider(),
    PaginationConfig,
    UserRouteAccessService
  ],
  bootstrap: [JhiMainComponent]
})
export class GreatBigExampleApplicationAppModule {

  constructor(
    public appRef: ApplicationRef,
    public appState: AppState
  ) { }

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    console.log('HMR store', JSON.stringify(store, null, 2));
    /**
     * Set state
     */
    this.appState._state = store.state;
    /**
     * Set input values
     */
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    /**
     * Save state
     */
    const state = this.appState._state;
    store.state = state;
    /**
     * Recreate root elements
     */
    store.disposeOldHosts = createNewHosts(cmpLocation);
    /**
     * Save input values
     */
    store.restoreInputValues = createInputTransfer();
    /**
     * Remove styles
     */
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    /**
     * Display new elements
     */
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
