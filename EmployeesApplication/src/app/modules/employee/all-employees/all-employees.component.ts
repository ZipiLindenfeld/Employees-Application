import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'; import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeDialogComponent } from '../add-employee-dialog-component/add-employee-dialog-component.component';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import * as XLSX from 'xlsx';
import { EmployeeRole } from '../employee-role.model';
import { RoleService } from '../role.service';
import { Role } from '../role.model';
import { EmployeeDetailesComponent } from '../employee-detailes/employee-detailes.component';
import { AddRoleComponent } from '../add-role/add-role.component';

@Component({
  selector: 'app-all-employees',
  templateUrl: './all-employees.component.html',
  styleUrl: './all-employees.component.scss'
})
export class AllEmployeesComponent {

  employees: Employee[];
  allEmployees: Employee[];
  roles: Role[];
  empRoles: EmployeeRole[];
  constructor(private _employeeService: EmployeeService, private _roleService: RoleService, private router: Router, private dialog: MatDialog) {
    this._roleService.getRoles().subscribe(data => {
      this.roles = data
    })
  }
  openShowDetailsEmployeeDialog(emp: Employee): void {
    const dialogRef = this.dialog.open(EmployeeDetailesComponent, {
      width: '600px',
      data: emp
    });
  }
  openAddEmployeeDialog(emp: Employee): void {
    if (emp == null)
      emp = new Employee();
    console.log(emp)
    const dialogRef = this.dialog.open(AddEmployeeDialogComponent, {
      width: '1000px',
      data: { emp: emp, roles: this.roles }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("result", result);
      if (result != undefined)
        this._employeeService.updateEmployee(result.id, result).subscribe(data => {
          Swal.fire({
            title: `Well done!!! `,
            text: "The employee updated successfully!",
            icon: "success"
          });
          this._employeeService.getEmployees().subscribe(data => {
            console.log("allemployees");
            console.log(data);


            this.allEmployees = data
            this.change();
          })
        });
    })
  }
  addRole() {
    const dialogRef = this.dialog.open(AddRoleComponent, {
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("result", result);
        this._roleService.addRole(result).subscribe(() => {
          this._roleService.getRoles().subscribe(data => this.roles = data)
        })
      }
    });
  }
  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.employees);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Employees');
    XLSX.writeFile(wb, 'employees.xlsx');
  }
  ngOnInit() {
    this._employeeService.getEmployees().subscribe(data => {
      this.allEmployees = data;
      this.change();
    })
  }
  editEmployee(emp: Employee) {
    this.router.navigate(['employee/editEmployee', emp]);
  }
  showDetailes(emp: Employee) {
    this.router.navigate(['employee/employeeDetailes', emp])
  }
  pattern = "";
  change() {
    this.employees = this.allEmployees.filter(e => e.firstName.includes(this.pattern) ||
      e.lastName.includes(this.pattern) ||
      e.employeeIdentification.includes(this.pattern) ||
      this.searchInRoles(e.roles))
  }
  searchInRoles(roles: EmployeeRole[]): boolean {
    let flag: boolean = false;
    roles.forEach(r => {
      if (r.role.name.includes(this.pattern))
        flag = true;
    })
    return flag;
  }
  deleteEmployee(id: number) {
    console.log("fff", id);
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this employee!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('User confirmed the deletion');
        this._employeeService.deleteEmployee(id).subscribe(() => {
          this._employeeService.getEmployees().subscribe(d => {
            this.allEmployees = d;
            this.change();
          })
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        console.log('User canceled the deletion');
      }
    });
  }
}
