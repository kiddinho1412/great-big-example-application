import { Injectable } from '@angular/core';

import { StatusBarService } from '../../../../../../main/webapp/app/shared/status-bar/status-bar.service';

@Injectable()
export class MockStatusBarService extends StatusBarService {
    constructor() {
        super(null);
    }
    onInit() {

    }
    setActive(newValue) {

    }
}
