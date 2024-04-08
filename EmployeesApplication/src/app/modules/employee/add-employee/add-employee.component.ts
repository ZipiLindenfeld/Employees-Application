import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { EmployeeRole } from '../employee-role.model';
import { Employee, Gender } from '../employee.model';
import { Role } from '../role.model';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})
export class AddEmployeeComponent {
  employee: Employee;
  employeeForm: FormGroup;
  gender = Gender;
  showDate: boolean[] = [];
  AvailableRoles: EmployeeRole[] = [];
  AllRoles: EmployeeRole[] = [];

  constructor(private router: Router, private formBuilder: FormBuilder, private _acr: ActivatedRoute, public dialogRef: MatDialogRef<AddEmployeeComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.employee = data.emp
    for (let i = 0; i < this.employee.roles.length; i++) {
      this.employee.roles[i].startDate = new Date(this.isValidDate(this.employee.roles[i].startDate) ? new Date(this.employee.roles[i].startDate).toISOString().substring(0, 10) : '');
    }
    this.employeeForm = new FormGroup({
      id: new FormControl(this.employee.id),
      firstName: new FormControl(this.employee.firstName, [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl(this.employee.lastName, [Validators.required, Validators.minLength(3)]),
      employeeIdentification: new FormControl(this.employee.employeeIdentification, [Validators.required, Validators.minLength(9), Validators.maxLength(9)], this.isValidIsraeliId),
      birthDate: new FormControl(this.isValidDate(this.employee.birthDate) ? new Date(this.employee.birthDate).toISOString().substring(0, 10) : '', [Validators.required]),
      gender: new FormControl(this.employee.gender, [Validators.required]),
      startDate: new FormControl(this.isValidDate(this.employee.startDate) ? new Date(this.employee.startDate).toISOString().substring(0, 10) : '', [Validators.required, this.isValidStartDate.bind(this)]),
      status: new FormControl(true),
      roles: this.formBuilder.array([])
    });

    this.data.roles.forEach((r) => {
      this.AllRoles.push(new EmployeeRole(r))
      this.showDate.push(false)
    })
    if (this.employee.roles.length > 0)
      this.employee.roles.forEach((r, i) => {
        this.addRole(r, i)
      })
    console.log("after init roles");
    console.log(this.employeeForm.get('roles'));
    this.AvailableRoles = this.AllRoles.filter(role => !this.isIncludes(this.employee.roles, role));
  }
  isValidIsraeliId(id: string): { [key: string]: boolean } | null {
    
  }
  isValidStartDate(): { [key: string]: boolean } | null {
    if (this.employeeForm && this.employeeForm.get('startDate').value < this.employeeForm.get('birthDate').value)
      return { 'inValidStartDate': true };
    return null;
  }
  isIncludes(a: EmployeeRole[], b: EmployeeRole) {
    for (let i = 0; i < a.length; i++)
      if (a[i].role.id == b.roleId)
        return true;
    return false;
  }
  private isValidDate(value: any): boolean {
    const date = new Date(value);
    return !isNaN(date.getTime());
  }

  getRoleName(id: number) {
    return this.AllRoles.find(r => r.roleId == id);
  }
  createRole(r: EmployeeRole): FormGroup {
    console.log(r);
    return this.formBuilder.group({
      id: [r.role.id],
      startDate: [r.startDate],
      name: [r.role.name]
    });
  }
  addRole(r: EmployeeRole, i: number): void {
    this.showDate[i] = false;
    this.AvailableRoles = this.AvailableRoles.filter(role => role.roleId !== r.roleId);
    const roles = this.employeeForm.get('roles') as FormArray;
    roles.push(this.createRole(r));
    console.log("after add roles");
    console.log(this.employeeForm.get('roles'));

  }

  removeRole(r: any, index: number): void {

    let x = new EmployeeRole(new Role(r.id))
    x.role.name = r.name

    this.AvailableRoles.push(x);
    const roles = this.employeeForm.get('roles') as FormArray;
    roles.removeAt(index);
  }
  saveNewEmployee() {
    console.log("beforeSave:", this.employeeForm.get('roles').value);
    console.log("employee:before:form", this.employee);
    this.employee = this.employeeForm.value;
    let roles = this.employeeForm.get('roles').value
    this.employee.roles = [];
    roles.forEach(r => {
      let x = new EmployeeRole(new Role(r.id));
      x.roleId = r.id;
      x.startDate = r.startDate
      this.employee.roles.push(x);
    })
    let x: any = +this.employee.gender
    this.employee.gender = x;
    console.log("================");
    console.log(this.employee);
    console.log("================");
    this.isValidEmployee(this.employee)
    this.dialogRef.close(this.employee)
  }
  isValidEmployee(employee: Employee) {
  }
  chooseStartDate(value: any) {
    console.log("השךוק:", value);

  }
  showDateInput(i: number) {
    this.showDate[i] = !this.showDate[i];
  }


  cancel() {
    this.dialogRef.close()
  }
  showDetailes(emp: Employee) {
    this.router.navigate(['employee/detailes', emp])
  }

}