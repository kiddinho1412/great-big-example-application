import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { GreatBigExampleApplicationTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { UserCustomDetailComponent } from '../../../../../../main/webapp/app/entities/user-custom/user-custom-detail.component';
import { UserCustomService } from '../../../../../../main/webapp/app/entities/user-custom/user-custom.service';
import { UserCustom } from '../../../../../../main/webapp/app/entities/user-custom/user-custom.model';

describe('Component Tests', () => {

    describe('UserCustom Management Detail Component', () => {
        let comp: UserCustomDetailComponent;
        let fixture: ComponentFixture<UserCustomDetailComponent>;
        let service: UserCustomService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreatBigExampleApplicationTestModule],
                declarations: [UserCustomDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    UserCustomService,
                    EventManager
                ]
            }).overrideTemplate(UserCustomDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserCustomDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserCustomService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new UserCustom(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.userCustom).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
