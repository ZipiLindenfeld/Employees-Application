import { Component, Inject } from '@angular/core';
import { Employee } from '../employee.model';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddEmployeeDialogComponent } from '../add-employee-dialog-component/add-employee-dialog-component.component';


@Component({
  selector: 'app-employee-detailes',
  templateUrl: './employee-detailes.component.html',
  styleUrl: './employee-detailes.component.scss'
})
export class EmployeeDetailesComponent {
  employee: Employee;
  constructor(public dialogRef: MatDialogRef<EmployeeDetailesComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.employee = data
  }
  return() {
    this.dialogRef.close()
  }
}




