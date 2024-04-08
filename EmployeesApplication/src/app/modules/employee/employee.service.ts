import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee.model';
import { isNullOrUndefined } from 'util';

@Injectable()
export class EmployeeService implements OnInit {

  private employeesUrl = 'https://localhost:7213/api/Employee';
  token;
  header;
  constructor(private http: HttpClient) {

  }
  initTokenAndHeader() {
    if (typeof sessionStorage !== undefined) {
      this.token = sessionStorage?.getItem('userToken');
      this.header = new HttpHeaders().set('Authorization', this.token);
    }
  }
  ngOnInit(): void { }
  //ysankewitz@gmail.com

  getEmployees(): Observable<Employee[]> {
    this.initTokenAndHeader();
    return this.http.get<Employee[]>(this.employeesUrl, { 'headers': this.header });
  }

  getEmployeeById(id: number): Observable<Employee> {
    this.initTokenAndHeader()
    return this.http.get<Employee>(`${this.employeesUrl}/${id}`, { 'headers': this.header });
  }

  addEmployee(employee: any): Observable<Employee> {
    this.initTokenAndHeader()
    if (employee != undefined)
      employee.gender = +employee.gender;
    let emp: Employee = employee;
    if (employee != undefined)
      for (let role of emp.roles)
        role.roleId = +role.roleId;
    if (emp != undefined)
      emp.roles = emp.roles.filter(r => r.roleId != undefined && !Number.isNaN(r.roleId))
    console.log("emp:", emp)
    return this.http.post<Employee>(this.employeesUrl, emp, { 'headers': this.header });
  }

  updateEmployee(id: number, employee: any): Observable<Employee> {
    console.log("employee and id");

    console.log(employee);
    console.log(id);

    this.initTokenAndHeader();
    return this.http.put<Employee>(`${this.employeesUrl}/${id}`, employee, { 'headers': this.header });
  }

  deleteEmployee(id: number): Observable<any> {
    this.initTokenAndHeader()
    return this.http.delete(`${this.employeesUrl}/${id}`, { 'headers': this.header });
  }
}