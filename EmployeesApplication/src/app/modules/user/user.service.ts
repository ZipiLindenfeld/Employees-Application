import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "./user.model";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class UserService {
    constructor(private _http: HttpClient) { }
    loginUser(user: User): Observable<any> {
        return this._http.post<any>('https://localhost:7213/api/Auth', user);
    }
}