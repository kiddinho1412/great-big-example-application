import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EditorComponent } from './editor.component';
import { EditorGuard } from './editor.guard';
import { SharedModule } from '../shared/shared.module';
import { EditorRouting } from './editor.routing';

@NgModule({
    imports: [
        EditorRouting,
        SharedModule
    ],
    declarations: [
        EditorComponent
    ],
    providers: [
        EditorGuard
    ]
})
export class EditorModule { }
