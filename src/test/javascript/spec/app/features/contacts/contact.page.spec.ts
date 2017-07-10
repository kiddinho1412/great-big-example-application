// derived from https://gist.github.com/brandonroberts/a7faa171760aacbd7a53ec3d3342304c
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { GreatBigExampleApplicationTestModule } from '../../../test.module';
import * as fromRoot from '../../../../../../main/webapp/app/core/store';
import { GreatBigExampleApplicationSharedModule } from '../../../../../../main/webapp/app/shared/shared.module';
import { ContactPage } from '../../../../../../main/webapp/app/features/contact/contact.page';

describe('ContactPage', () => {
    let component: ContactPage;
    let fixture: ComponentFixture<ContactPage>;
    let debugElement: DebugElement;
    let store: Store<fromRoot.RootState>;
    let books;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                GreatBigExampleApplicationTestModule,
                // GreatBigExampleApplicationSharedModule,
                StoreModule.provideStore(fromRoot.reducer),
                RouterTestingModule
            ],
            declarations: [ContactPage],
            schemas: [
                NO_ERRORS_SCHEMA // ignore unknown elements
            ]
        }).overrideComponent(ContactPage, {
            set: {
                styleUrls: []
                // I assume you can do the same for templateUrl here
            }
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ContactPage);
        store = TestBed.get(Store);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        fixture.detectChanges();
    });

    beforeEach(() => {
        books = [
            {
                id: 'bookId',
                volumeInfo: {
                    title: 'Title',
                    subtitle: 'subtitle',
                    authors: ['author'],
                    publisher: 'publisher',
                    publishDate: 'publishDate',
                    description: 'description',
                    averageRating: 5,
                    ratingsCount: 1,
                    imageLinks: {
                        thumbnail: '',
                        smallThumbnail: ''
                    }
                }
            }
        ];
    });

    it('should create an instance of ContactPage', () => {
        expect(component).toBeTruthy();
    });

    // it('should display loaded books', () => {
    //   store.dispatch(new actions.LoadSuccess(books));

    //   fixture.detectChanges();

    //   const bookItems = debugElement.queryAll(By.css('jhi-book-preview'));
    //   expect(bookItems.length).toEqual(books.length);
    // });
});
