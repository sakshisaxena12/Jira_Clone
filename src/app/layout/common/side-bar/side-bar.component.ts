import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Role } from 'src/app/models/role';
import { Router } from '@angular/router';
import { CommonService } from '../service/common.service';
import { AppResponse } from 'src/app/models/appResponse';
import { CustomToastrService } from 'src/app/service/customToastr.service';
import { ErrorHandlingService } from 'src/app/service/error-handling.service';


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  opened = false;
  roles;

  CompanyId;
  boardId;
  message

  ADMIN_IT= false;
  ADMIN_HR=false;
  OWNER=false;
  SCRUM_MASTER=false;
  USER=false;
  employeedata:any[]=[]

  companylogo;

  constructor(private authService: AuthService,private router: Router, private commonService: CommonService,private customToastrService: CustomToastrService,
    private errorHandlingService: ErrorHandlingService) {

    this.CompanyId = sessionStorage.getItem('companyId');
    this.boardId = 1
    let id = sessionStorage.getItem('userID')

    this.companylogo = "http://localhost:3000/logos/" + this.CompanyId + ".jpeg"

    


    this.commonService.GetEmployee(id).subscribe(resp =>{

      console.log(resp)

      if(resp.status)
      {
        this.employeedata = resp.empData
        console.log(this.employeedata)
      }
      else
      { 
          // this.dangerStatus=true;
          // this.successStatus=false;
          this.message=resp.ErrorMessage;
          this.message=resp.message;
          this.customToastrService.GetErrorToastr(this.message, "Employee Status", 5000)

      }

    },   (error: AppResponse) => {


      this.errorHandlingService.errorStatus(error,"Employee Status")

}
)





    this.ADMIN_IT= false;
    this.ADMIN_HR=false;
    this.OWNER=false;
    this.SCRUM_MASTER=false;
    this.USER=false;

    this.roles = authService.getRole()

    if(Role.ADMIN_IT == authService.getRole())
    {
      this.ADMIN_IT=true
    }
    if(Role.ADMIN_HR == authService.getRole())
    {
      this.ADMIN_HR=true
    }
    if(Role.OWNER == authService.getRole())
    {
      this.OWNER=true
    }
    if(Role.SCRUM_MASTER == authService.getRole())
    {
      this.SCRUM_MASTER=true
    }

    if(Role.USER == authService.getRole())
    {
      this.USER=true
    }

    console.log(this.roles)


   }


   routersToRedirect(name)
   {
     console.log(name)
      this.router.navigate([`company/${this.CompanyId}/${name}`]);
   }

  

  ngOnInit() {
  }

}
