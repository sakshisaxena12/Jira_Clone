import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CustomToastrService } from 'src/app/service/customToastr.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from './service/dashboard.service';
import { AppResponse } from 'src/app/models/appResponse';
import { ErrorHandlingService } from 'src/app/service/error-handling.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  CompanyId;
  BoardId

  Alldata:any;

  message

 Ready: any[]=[];
 Dev: any[]=[];
 QandA: any[]=[];
 Done: any[]=[];

  constructor(private authService: AuthService,
              private dashboardService: DashboardService,
              private toastr: ToastrService, 
              private customToastrService: CustomToastrService,
              private route: ActivatedRoute,
              private errorHandlingService: ErrorHandlingService,
              private router: Router) { 

                this.CompanyId=sessionStorage.getItem("companyId")

    // this.authService.getdata().subscribe(data => {
    //   console.log(data)
    // })





  }

  ngOnInit() {


    this.route.paramMap.subscribe(params => {
      this.BoardId = params.get('boardId');
      this.CompanyId=sessionStorage.getItem("companyId")

      console.log(this.BoardId)


      this.dashboardService.getBoardData(this.BoardId).subscribe(resp =>{

        console.log(resp)
  
        if(resp.status)
        {
          this.Alldata = resp.tickets
          console.log(this.Alldata)


          let i;
          this.Ready=[]
          this.Dev=[]
          this.QandA=[]
          this.Done=[]
          for(i=0;i<this.Alldata.length;i++)
          {
            //console.log("yes")
  
            if(this.BoardId == this.Alldata[i].boardId)
            {
              if(this.Alldata[i].status == "READY")
              {
                this.Ready.push(this.Alldata[i])
              }
  
              else if(this.Alldata[i].status == "DEV_IN_PROGRESS")
              {
                this.Dev.push(this.Alldata[i])
              }
  
              else if(this.Alldata[i].status == "QA_IN_PROGRESS")
              {
                this.QandA.push(this.Alldata[i])
              }
  
              else if(this.Alldata[i].status == "DONE")
              {
                this.Done.push(this.Alldata[i])
              }
            }
          }

            
        }
        else
        { 
            this.message=resp.message;
            this.customToastrService.GetErrorToastr(this.message, "Employee List Status", 5000)
  
        }
  
      },   (error: AppResponse) => {
  
  
        this.errorHandlingService.errorStatus(error,"Entity List Status")
  
  }
  )



      // Do more processing here if needed
    });
  
  }


  showSuccess() {
    console.log("yes")

    this.customToastrService.GetErrorToastr('Hello world1  !', 'abhay sahu1', 10000);

    this.customToastrService.GetErrorToastr('Hello world1  !', 'abhay sahu2', 10000);

    this.customToastrService.GetErrorToastr('Hello world1  !', 'abhay sahu3', 10000);

    this.customToastrService.GetErrorToastr('Hello world4  !', 'abhay sahu4', 10000);

    this.customToastrService.GetErrorToastr('Hello world5  !', 'abhay sahu5', 10000);
    
  }


  toCheckTitleOrNot(mainFieldsValues)
  {
    
    if(mainFieldsValues.Title == "title")
    {
      return true
    }

    else{
      return false
    }
  }

  toCheckSubtitleOrNot(mainFieldsValues)
  {
    // console.log(mainFieldsValues)
    if(mainFieldsValues.Title == "subTitle")
    {
      return true
    }

    else{
      return false
    }

  }

  toCheckPriorityOrNot(mainFieldsValues)
  {
    // console.log(mainFieldsValues)
    if(mainFieldsValues.Title == "Priority")
    {
      return true
    }

    else{
      return false
    }

  }

}
