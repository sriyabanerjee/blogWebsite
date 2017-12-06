import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { Catagory } from 'app/models/catagory';

@Injectable()
export class CatagoryService {
    constructor(private _http: Http) {

    }

    getAllCatagories(): Observable<Catagory[]> {
        let h = new Headers();
        h.append("x-access-token", localStorage.getItem('x-acess-token'));
        let x = this._http.get("http://localhost:3000/api/catagories",
            { headers: h }).map((response: Response) => <Catagory[]>response.json());

        return x;
    }
}