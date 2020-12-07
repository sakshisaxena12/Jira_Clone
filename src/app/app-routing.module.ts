import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

import { LoginComponent } from './login/login/login.component';
import { NavBarComponent } from './layout/common/nav-bar/nav-bar.component';
import { DefaultComponent } from './layout/default/default.component';
import { DashboardComponent } from './layout/component/dashboard/dashboard.component';
import { PageNotFoundComponent } from './layout/component/page-not-found/page-not-found.component';
import { AuthGuardService } from './service/auth-guard.service';
import { SubdashboardComponent } from './layout/component/dashboard/components/subdashboard/subdashboard.component';
import { Role } from './models/role';

const routes: Routes = [

  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},

  {path: 'navbar', component: NavBarComponent},
  // {path: 'subdashboard' , component: SubdashboardComponent},



  {
    path: 'dashboard', component: DefaultComponent,
      //canActivate: [AuthGuardService],
      // data: { roles: [
      //   Role.Admin,
      //   Role.HR,
      //   Role.Manager,
      //   Role.User
      // ] },

    children: [
      {
        path: '', component: DashboardComponent,
        //canActivate: [AuthGuardService]
      },

      
     
      // {
      //   path: 'create/new/employee', component:CreateEmployeeComponent,
      //   canActivate: [AuthGuardService],
      //   data: { roles: [
      //     Role.Admin,
      //     Role.HR,
      //     //Role.Manager,
      //     //Role.User
      //   ]}
      // },
     
      
      // {
      //   path: 'use/attendance/:id/:name', component: MyAttendanceComponent,
      //   canActivate: [AuthGuardService],
      //   data: { roles: [
      //     Role.Admin,
      //     Role.HR,
      //     //Role.Manager,
      //     //Role.User
      //   ]}
      // },
      
      {
        path: 'pagenotfound' , component: PageNotFoundComponent,
        // canActivate: [AuthGuardService],
        // data: { roles: [
        //   Role.Admin,
        //   Role.HR,
        //   Role.Manager,
        //   Role.User
        // ]}
      },
      // {
      //   path: 'employer/list', component: EmployerListComponent,
      //   canActivate: [AuthGuardService],
      //   data: { roles: [
      //     Role.Admin,
      //     //Role.HR,
      //     //Role.Manager,
      //     //Role.User
      //   ]}
      // },
      {
        path: 'subdashboard' , component: SubdashboardComponent,
        // canActivate: [AuthGuardService],
        // data: { roles: [
        //   Role.Admin,
        //   Role.HR,
        //   Role.Manager,
        //   Role.User
        // ]}
      }
    ],
  },

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    ToastrModule.forRoot()],
  exports: [RouterModule]
})
export class AppRoutingModule { }
