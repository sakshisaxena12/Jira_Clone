import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CustomToastrService } from 'src/app/service/customToastr.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from './service/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  CompanyId;
  BoardId

  Alldata:any;

 Ready: any[]=[];
 Dev: any[]=[];
 QandA: any[]=[];
 Done: any[]=[];

  constructor(private authService: AuthService,
              private dashboardService: DashboardService,
              private toastr: ToastrService, 
              private customToastrService: CustomToastrService,
              private route: ActivatedRoute,
              private router: Router) { 

    // this.authService.getdata().subscribe(data => {
    //   console.log(data)
    // })





  }

  ngOnInit() {


    this.route.paramMap.subscribe(params => {
      this.BoardId = params.get('boardId');
      this.CompanyId=2

      console.log(this.BoardId)



      
      this.dashboardService.getalldata().subscribe(resp =>{

        this.Alldata = resp
        console.log(this.Alldata)
        let i;
        this.Ready=[]
        this.Dev=[]
        this.QandA=[]
        this.Done=[]
        for(i=0;i<this.Alldata.length;i++)
        {

          console.log("yes")

          if(this.BoardId == this.Alldata[i].BoardId)
          {
            if(this.Alldata[i].Status == "1")
            {
              this.Ready.push(this.Alldata[i])
            }

            else if(this.Alldata[i].Status == "2")
            {
              this.Dev.push(this.Alldata[i])
            }

            else if(this.Alldata[i].Status == "3")
            {
              this.QandA.push(this.Alldata[i])
            }

            else if(this.Alldata[i].Status == "4")
            {
              this.Done.push(this.Alldata[i])
            }
            

          }


        }

        console.log(this.Ready)
        console.log(this.Dev)
        console.log(this.QandA)
        console.log(this.Done)
        
      })

      

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

}
