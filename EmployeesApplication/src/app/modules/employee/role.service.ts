import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from './role.model';

@Injectable()
export class RoleService implements OnInit {

  private rolesUrl = 'https://localhost:7213/api/Role';

  token;
  header;
  constructor(private _http: HttpClient) {

  }
  ngOnInit(): void { }
  initTokenAndHeader() {
    if (typeof window !== undefined) {
      this.token = sessionStorage?.getItem('userToken');
      this.header = new HttpHeaders().set('Authorization', this.token);
    }
  }

  getRoles(): Observable<any[]> {
    this.initTokenAndHeader();
    console.log(this.header)
    return this._http.get<any[]>(this.rolesUrl, { 'headers': this.header });
  }

  getRoleById(id: number): Observable<Role> {
    this.initTokenAndHeader();
    return this._http.get<Role>(`${this.rolesUrl}/${id}`, { 'headers': this.header });
  }

  addRole(role: any): Observable<Role> {
    this.initTokenAndHeader();
    return this._http.post<Role>(this.rolesUrl, role, { 'headers': this.header });
  }

}