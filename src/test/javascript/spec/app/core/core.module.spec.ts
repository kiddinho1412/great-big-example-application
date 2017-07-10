/* tslint:disable:no-unused-variable */
import { CoreModule } from '../../../../../main/webapp/app/core/core.module';
import { ApplicationRef } from '@angular/core';
import { Store } from '@ngrx/store';

describe('LayoutComponent', () => {
    it('should fail fast if a parent Module has already imported the CoreModule', () => {
        expect(() => new CoreModule(CoreModule)).toThrow();
    });
});
