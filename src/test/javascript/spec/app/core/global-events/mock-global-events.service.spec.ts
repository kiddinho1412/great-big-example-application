import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

import { GlobalEventsService } from '../../../../../../main/webapp/app/core/global-events/global-events.service';

@Injectable()
export class MockGlobalEventsService extends GlobalEventsService {
    constructor() {
        super(null);
    }
    onInit() {
        this.emitters$['scroll'] = new Subject();
        this.emitters$['resize'] = new Subject();
    }
    update() {
        this.emitters$['scroll'].next();
        this.emitters$['resize'].next();
    }
}
