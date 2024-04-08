import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { EmployeeModule } from './modules/employee/employee.module';
import { EmployeeRoutingModule } from './modules/employee/employee-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';
import { AddEmployeeDialogComponent } from './modules/employee/add-employee-dialog-component/add-employee-dialog-component.component';
import { MatDialog } from '@angular/material/dialog';
import { Employee } from './modules/employee/employee.model';
import { Role } from './modules/employee/role.model';
import { RoleService } from './modules/employee/role.service';
import { EmployeeService } from './modules/employee/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, HttpClientModule, EmployeeModule, MatFormFieldModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'EmployeesApplication';
  roles: Role[];
  emp: Employee;
  constructor(private dialog: MatDialog, private _roleService: RoleService, private _employeeService: EmployeeService, private router: Router, private _acr: ActivatedRoute) {
  }
  ngOnInit(): void {
    // if (typeof window !== undefined)
    //   this.connected = sessionStorage?.getItem('userToken') != null;
    // this._acr.paramMap.subscribe(paramMap => {
    //   console.log(paramMap)
    //   if (paramMap)
    //     if (paramMap.has("connected")) {
    //       if (paramMap.get("connected"))
    //         this, this.connected = true;
    //     }
    // });
  }
  connected() {
    if (typeof window !== undefined)
      return sessionStorage?.getItem('userToken') != null;
    return false;
  }
  login() {
    this.router.navigate(["/user/login", { isLogout: true }])
  }
  logout() {
    if (typeof window !== undefined) {
      Swal.fire({
        title: 'Are you sure you want to log out?',
        text: 'You are about to log out this application!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, log out!',
        cancelButtonText: 'No, I want to stay!'
      }).then((result) => {
        if (result.isConfirmed) {
          // this.connected = false;
          this.router.navigate(["/user/logout", { isLogout: true }])
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.router.navigate(['employee/allEmployees'])
        }
      });

    }


  }

  addEmployee() {
    this.emp = new Employee();
    this._roleService.getRoles().subscribe(data => {
      this.roles = data
      const dialogRef = this.dialog.open(AddEmployeeDialogComponent, {
        width: '1000px',
        data: { emp: this.emp, roles: this.roles }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(result)
        if (result != undefined) {
          this._employeeService.addEmployee(result).subscribe(data => {
            Swal.fire({
              title: `Well done!!! `,
              text: "The employee was successfully added!",
              icon: "success"
            });
          });
        }
      })
    })

  }
}
