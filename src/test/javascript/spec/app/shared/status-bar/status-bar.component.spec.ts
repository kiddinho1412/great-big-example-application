/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StatusBarComponent } from '../../../../../../main/webapp/app/shared/status-bar/status-bar.component';
import { StatusBarService } from '../../../../../../main/webapp/app/shared/status-bar/status-bar.service';
import { MockStatusBarService } from './mock-status-bar.service.spec';

describe('StatusBarComponent', () => {
    let mockStatusBarService: MockStatusBarService;
    let component: StatusBarComponent;
    let fixture: ComponentFixture<StatusBarComponent>;

    beforeEach(async(() => {
        mockStatusBarService = new MockStatusBarService();
        TestBed.configureTestingModule({
            declarations: [StatusBarComponent],
            providers: [
                { provide: StatusBarService, useValue: mockStatusBarService }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StatusBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should set height to 0px', done => {
        setTimeout(() => {
            expect(component.top).toBe('-0px');
            done();
        }, 300);
    });
});
