import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { UserCustom } from './user-custom.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class UserCustomService {

    private resourceUrl = 'api/user-customs';
    private resourceSearchUrl = 'api/_search/user-customs';

    constructor(private http: Http) { }

    create(userCustom: UserCustom): Observable<UserCustom> {
        const copy = this.convert(userCustom);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(userCustom: UserCustom): Observable<UserCustom> {
        const copy = this.convert(userCustom);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<UserCustom> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    search(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
            .map((res: any) => this.convertResponse(res));
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(userCustom: UserCustom): UserCustom {
        const copy: UserCustom = Object.assign({}, userCustom);
        return copy;
    }
}
