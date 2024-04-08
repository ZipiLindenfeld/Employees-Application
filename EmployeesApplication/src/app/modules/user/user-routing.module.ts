import { Route, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { NgModule } from "@angular/core";


const APP_ROUTES: Route[] = [
    {path:"login",component:LoginComponent},
    {path:"logout",component:LoginComponent},

]

@NgModule({
    imports: [RouterModule.forChild(APP_ROUTES)],
    exports: [RouterModule]
})
export class UserRoutingModule {

}