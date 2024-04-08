import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../employee.model';
import { EmployeeRole } from '../employee-role.model';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  ngOnInit(): void {

  }
  // employeeForm: FormGroup;
  // employee: Employee = new Employee();
  // availableRoles: EmployeeRole[] = [];
  // roles: FormArray;

  // constructor(
  //   @Inject(MAT_DIALOG_DATA) public data: any,
  //   private dialogRef: MatDialogRef<AddEmployeeComponent>,
  //   private formBuilder: FormBuilder
  // ) {
  //   this.employee = data.emp;

  //   data.roles.forEach(element => {
  //     this.availableRoles.push(new EmployeeRole(element))
  //   });

  //   this.employeeForm = this.formBuilder.group({
  //     firstName: [this.employee?.firstName, Validators.required],
  //     lastName: [this.employee?.lastName, Validators.required],
  //     identificationNumber: [this.employee?.identificationNumber, Validators.required],
  //     gender: [this.employee?.gender],
  //     dateOfBirth: [this.isValidDate(this.employee?.dateOfBirth) ? new Date(this.employee?.dateOfBirth).toISOString().substring(0, 10) : '', [Validators.required, Validators.min(3)]],
  //     employmentStartDate: [this.isValidDate(this.employee?.employmentStartDate) ? new Date(this.employee?.employmentStartDate).toISOString().substring(0, 10) : '', Validators.required],
  //     status: [true],
  //     roles: this.formBuilder.array([])
  //   });

  //   this.roles = this.employeeForm.get('roles') as FormArray;
  //   if (this.employee.roles && this.employee.roles.length > 0) {
  //     this.employee.roles.forEach(role => {
  //       this.addRole(role.role.id, role.startDate);
  //     });
  //   } else {
  //     this.addRole();
  //   }
  // }

  // ngOnInit(): void { }

  // private isValidDate(value: any): boolean {
  //   const date = new Date(value);
  //   return !isNaN(date.getTime());
  // }

  // addRole(roleId: number = 0, entryDate: Date = new Date()): void {
  //   this.roles.push(this.formBuilder.group({
  //     roleId: [roleId, Validators.required],
  //     entryDate: [entryDate.toISOString().substring(0, 10), Validators.required]
  //   }));
  // }

  // removeRole(index: number): void {
  //   this.roles.removeAt(index);
  // }

  // addEmployee(): void {
  //   if (this.employeeForm.valid) {
  //     const employeeData = this.employeeForm.value;
  //     this.dialogRef.close(employeeData);
  //   }
  // }
}