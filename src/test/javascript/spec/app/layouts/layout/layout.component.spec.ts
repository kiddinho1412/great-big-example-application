/* tslint:disable:no-unused-variable */
import { Injectable } from '@angular/core';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { Route, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Subject } from 'rxjs/Rx';

import { LayoutComponent } from '../../../../../../main/webapp/app/layouts/layout/layout.component';
import { CoreModule } from '../../../../../../main/webapp/app/core/core.module';
import { FooterComponent } from '../../../../../../main/webapp/app/layouts/footer/footer.component';
import { GlobalEventsService } from '../../../../../../main/webapp/app/core/global-events/global-events.service';
import { NavComponent } from '../../../../../../main/webapp/app/shared/nav/nav.component';
import { HomeComponent } from '../../../../../../main/webapp/app/home/home.component';
import { GreatBigExampleApplicationHomeModule } from '../../../../../../main/webapp/app/home/home.module';
import { ApiService } from '../../../../../../main/webapp/app/core/api/api.service';
import { MockApiService } from '../../core/api/mock-api.service.spec';
import { StatusBarService } from '../../../../../../main/webapp/app/shared/status-bar/status-bar.service';
import { MockDocumentService } from '../../../mocks/mock-document.service.spec';

describe('LayoutComponent', () => {
    const config: Route[] = [
        { path: '', component: HomeComponent },
        { path: 'test', component: HomeComponent, data: { layout: { paddingTop: true } } }
    ];
    let component: LayoutComponent;
    let fixture: ComponentFixture<LayoutComponent>;
    let location: Location;
    let router: Router;
    const mockDocumentService = new MockDocumentService();
    const mockApiService = new MockApiService();
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                CoreModule,
                GreatBigExampleApplicationHomeModule,
                RouterTestingModule.withRoutes(config)
            ],
            providers: [
                GlobalEventsService,
                StatusBarService,
                { provide: ApiService, useValue: mockApiService },
                { provide: 'Document', useValue: mockDocumentService },
                { provide: 'Window', useValue: window }
            ]
        })
            .compileComponents();
    }));

    beforeEach(inject([Router, Location], (_router: Router, _location: Location) => {
        location = _location;
        router = _router;
        fixture = TestBed.createComponent(LayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should update padding on Height changes', () => {
        component.onHeightChange('top', 40, 10);
        expect(component.padding.top).toEqual(50);
    });

    it('should set fixed to true on route change', () => {
        router.navigate(['/test']).then(() => {
            expect(location.path()).toBe('/test');
            expect(component.layout['paddingTop']).toBe(true);
        });
    });

});
