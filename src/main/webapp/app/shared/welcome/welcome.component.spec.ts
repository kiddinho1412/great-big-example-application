import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WelcomeComponent } from './welcome.component';
import { Principal } from '../../shared/auth/principal.service';

describe('WelcomeComponent', () => {

    let comp: WelcomeComponent;
    let fixture: ComponentFixture<WelcomeComponent>;
    let componentPrincipal: Principal; // the actually injected service
    let userService: Principal; // the TestBed injected service
    let de: DebugElement;  // the DebugElement with the welcome message
    let el: HTMLElement; // the DOM element with the welcome message

    let userServiceStub: {
        isLoggedIn: boolean;
        user: { name: string }
    };

    beforeEach(() => {
        // stub Principal for test purposes
        userServiceStub = {
            isLoggedIn: true,
            user: { name: 'Test User' }
        };

        TestBed.configureTestingModule({
            declarations: [WelcomeComponent],
            // providers:    [ Principal ]  // NO! Don't provide the real service!
            // Provide a test-double instead
            providers: [{ provide: Principal, useValue: userServiceStub }]
        });

        fixture = TestBed.createComponent(WelcomeComponent);
        comp = fixture.componentInstance;

        // Principal actually injected into the component
        userService = fixture.debugElement.injector.get(Principal);
        componentPrincipal = userService;
        // Principal from the root injector
        userService = TestBed.get(Principal);

        //  get the "welcome" element by CSS selector (e.g., by class name)
        de = fixture.debugElement.query(By.css('.welcome'));
        el = de.nativeElement;
    });

    it('should welcome the user', () => {
        fixture.detectChanges();
        const content = el.textContent;
        expect(content).toContain('Welcome', '"Welcome ..."');
        expect(content).toContain('Test User', 'expected name');
    });

    it('should welcome "Bubba"', () => {
        userService.setName('Bubba'); // welcome message hasn't been shown yet
        fixture.detectChanges();
        expect(el.textContent).toContain('Bubba');
    });

    it('should request login if not logged in', () => {
        userService.isAuthenticated = false; // welcome message hasn't been shown yet
        fixture.detectChanges();
        const content = el.textContent;
        expect(content).not.toContain('Welcome', 'not welcomed');
        expect(content).toMatch(/log in/i, '"log in"');
    });

    it('should inject the component\'s Principal instance',
        inject([Principal], (service: Principal) => {
            expect(service).toBe(componentPrincipal);
        }));

    it('TestBed and Component Principal should be the same', () => {
        expect(userService === componentPrincipal).toBe(true);
    });

    it('stub object and injected Principal should not be the same', () => {
        expect(userServiceStub === userService).toBe(false);

        // Changing the stub object has no effect on the injected service
        userServiceStub.isLoggedIn = false;
        expect(userService.isAuthenticated()).toBe(true);
    });
});

/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
