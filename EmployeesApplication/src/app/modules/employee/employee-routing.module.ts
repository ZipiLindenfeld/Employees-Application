import { Route, RouterModule } from "@angular/router";
import { LoginComponent } from "../user/login/login.component";
import { NgModule } from "@angular/core";
import { AddEmployeeComponent } from "./add-employee/add-employee.component"
import { AllEmployeesComponent } from "./all-employees/all-employees.component";
import { EmployeeDetailesComponent } from "./employee-detailes/employee-detailes.component";

const APP_ROUTES: Route[] = [
    { path: "addEmployee", component: AddEmployeeComponent },
    { path: "allEmployees", component: AllEmployeesComponent },
    { path: "employeeDetailes", component: EmployeeDetailesComponent },
    { path: "editEmployee", component: AddEmployeeComponent }
]

@NgModule({
    imports: [RouterModule.forChild(APP_ROUTES)],
    exports: [RouterModule]
})
export class EmployeeRoutingModule {

}