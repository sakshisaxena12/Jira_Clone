import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  BoardId;
  board:any[]=[]
  message;

  constructor(private authService: AuthService,private commonService: CommonService,private customToastrService: CustomToastrService,
    private errorHandlingService: ErrorHandlingService,private route: ActivatedRoute,private router: Router) {

     this.Name = "XYZ"
     this.CompanyId = sessionStorage.getItem("companyId")
     console.log("abay sahu")


     this.commonService.GetBoardId().subscribe(resp =>{

      console.log(resp)

      if(resp.status)
      {
        this.board = resp.boards
        console.log(this.board)
      }
      else
      { 
          // this.dangerStatus=true;
          // this.successStatus=false;
          this.message=resp.message;
          this.customToastrService.GetErrorToastr(this.message, "Board Status", 5000)

      }

    },   (error: AppResponse) => {


      this.errorHandlingService.errorStatus(error,"Board Status")

}
)


   }

  ngOnInit() {

    this.BoardId = this.route.firstChild.snapshot.params['boardId']
  }


  passTheRoute(id)
  {
    this.BoardId = id
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
