import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { UserRoutingModule } from "../user/user-routing.module";
import { UserService } from "./user.service";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { RoleService } from "../employee/role.service";


@NgModule({
    declarations: [LoginComponent],
    imports: [FormsModule, ReactiveFormsModule, HttpClientModule, CommonModule, UserRoutingModule, MatFormFieldModule, MatIconModule, MatInputModule],
    providers: [UserService,RoleService],
    exports: [LoginComponent]
})

export class UserModule {

}