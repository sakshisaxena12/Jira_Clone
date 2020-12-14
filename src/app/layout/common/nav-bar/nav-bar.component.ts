import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppResponse } from 'src/app/models/appResponse';
import { AuthService } from 'src/app/service/auth.service';
import { CustomToastrService } from 'src/app/service/customToastr.service';
import { ErrorHandlingService } from 'src/app/service/error-handling.service';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  Name;
  CompanyId;
  DropDown:any[]=[]
  message;

  constructor(private authService: AuthService,private commonService: CommonService,private customToastrService: CustomToastrService,
    private errorHandlingService: ErrorHandlingService) {
     this.Name = "XYZ"
     this.CompanyId = 2
     console.log("abay sahu")


     this.commonService.GetBoardId().subscribe(resp =>{

      console.log(resp)

      if(resp.status)
      {
        this.DropDown = resp.boards
        console.log(this.DropDown)
      }
      else
      { 
          // this.dangerStatus=true;
          // this.successStatus=false;
          this.message=resp.message;
          this.customToastrService.GetErrorToastr(this.message, "Employee List Status", 5000)

      }

    },   (error: AppResponse) => {


      this.errorHandlingService.errorStatus(error,"Entity List Status")

}
)


   }

  ngOnInit() {
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();


    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 100);

}


Logout()
{
  console.log()
  this.authService.logout()
}

}
