import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { Router, Routes, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement, Injectable } from '@angular/core';

import { BaImageLoaderService, BaThemePreloader, BaThemeSpinner } from '../../../../../../main/webapp/app/theme/services';
import { JhiMainComponent } from '../../../../../../main/webapp/app/layouts/main/main.component';
import { GreatBigExampleApplicationTestModule } from '../../../test.module';
import { JhiLanguageHelper, StateStorageService } from '../../../../../../main/webapp/app/shared';
import { BaThemeConfig } from '../../../../../../main/webapp/app/theme/theme.config';
import { BaThemeConfigProvider } from '../../../../../../main/webapp/app/theme';

// let mockSnapshot: any = jasmine.createSpyObj<RouterStateSnapshot>("RouterStateSnapshot", ['toString']);

@Injectable()
export class MockActivatedRoute extends ActivatedRoute {
    snapshot: any;
    constructor() {
        super();
        this.defaultRoute();
    }
    defaultRoute() {
        this.snapshot = {
            url: [{ path: '' }]
        };
    }
}

describe('App', () => {
    let component: JhiMainComponent;
    let fixture: ComponentFixture<JhiMainComponent>;
    let mockActivatedRoute: MockActivatedRoute;
    beforeEach(async(() => {
        mockActivatedRoute = new MockActivatedRoute();
        TestBed.configureTestingModule({
            imports: [GreatBigExampleApplicationTestModule,
                RouterTestingModule.withRoutes([
                    {
                        path: '',
                        component: JhiMainComponent,
                        data: {
                            authorities: [],
                            pageTitle: 'home.title'
                        }
                    }])],
            declarations: [JhiMainComponent],
            providers: [
                BaImageLoaderService,
                BaThemePreloader,
                BaThemeSpinner,
                BaThemeConfig,
                BaThemeConfigProvider,
                {
                    provide: StateStorageService,
                    useValue: null
                },
                {
                    provide: JhiLanguageHelper,
                    useValue: null
                },
                {
                    provide: ActivatedRoute,
                    useValue: mockActivatedRoute
                }
            ]
        })
            .overrideTemplate(JhiMainComponent, '')
            .compileComponents();
    }));

    it('should work', () => {
        let fixture = TestBed.createComponent(JhiMainComponent);
        expect(fixture.componentInstance instanceof JhiMainComponent).toBe(true, 'should create JhiMainComponent');
        console.log('After test...');
    });

    it('should create the app', async(() => {
        let fixture = TestBed.createComponent(JhiMainComponent);
        let app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it(`should have as title 'home.title'`, async(() => {
        let fixture = TestBed.createComponent(JhiMainComponent);
        let app = fixture.debugElement.componentInstance;
        expect(app.getPageTitle(mockActivatedRoute.snapshot)).toEqual('home.title');
    }));

    // it('should render title in a h1 tag', async(() => {
    //     let fixture = TestBed.createComponent(JhiMainComponent);
    //     fixture.detectChanges();
    //     let compiled = fixture.debugElement.nativeElement;
    //     expect(compiled.querySelector('h1').textContent).toContain('app works!');
    // }));
});
