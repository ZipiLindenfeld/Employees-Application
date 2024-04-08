import { NgModule } from "@angular/core";
import { LoginComponent } from "../user/login/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { EmployeeRoutingModule } from "./employee-routing.module";
import { EmployeeService } from "./employee.service";
import { RoleService } from "./role.service";
import { AllEmployeesComponent } from "./all-employees/all-employees.component";
import { AddEmployeeComponent } from "./add-employee/add-employee.component";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatNativeDateModule, MatOptionModule } from "@angular/material/core";
import { MatRadioModule } from '@angular/material/radio';
import { EmployeeDetailesComponent } from "./employee-detailes/employee-detailes.component";
import { MatChipsModule } from "@angular/material/chips";
import { AddEmployeeDialogComponent } from "./add-employee-dialog-component/add-employee-dialog-component.component";
import { MatDialogActions, MatDialogModule } from '@angular/material/dialog'; // Import MatDialogModule
import { AddRoleComponent } from "./add-role/add-role.component";
import { MatSelectModule } from "@angular/material/select"
import { MatDatepickerModule } from "@angular/material/datepicker"
import { MatGridListModule } from "@angular/material/grid-list"



@NgModule({
    declarations: [AddEmployeeComponent, AllEmployeesComponent, EmployeeDetailesComponent, AddEmployeeDialogComponent, AddRoleComponent],

    imports: [EmployeeRoutingModule, MatDialogActions, HttpClientModule, CommonModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatIconModule, MatDatepickerModule, MatNativeDateModule, MatRadioModule, MatCardModule, MatButtonModule, MatInputModule, MatSelectModule, MatGridListModule],
    providers: [RoleService, EmployeeService],
    exports: []
})

export class EmployeeModule {

}