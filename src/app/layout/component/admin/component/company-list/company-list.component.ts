import { Component, OnInit } from '@angular/core';
import { AppResponse } from 'src/app/models/appResponse';
import { CustomToastrService } from 'src/app/service/customToastr.service';
import { ErrorHandlingService } from 'src/app/service/error-handling.service';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {

  companyList: any[]=[]
  newcompanyList={}

  message

  constructor(private companyService: AdminService,private customToastrService: CustomToastrService,
    private errorHandlingService: ErrorHandlingService,) {

    this.companyService.getCompanyList().subscribe(resp =>{

      console.log(resp)

      if(resp.status)
      {
        this.companyList = resp.companies

        for(let x=0; x<this.companyList.length;x++)
        {
          this.companyList[x].code=this.companyList[x].contact.code
          
          this.companyList[x].number=this.companyList[x].contact.number

          this.companyList[x].logo= "http://localhost:3000/logos/" + this.companyList[x].id +".jpeg"
          

       
        }

        console.log(this.companyList)
      }
      else
      { 
          // this.dangerStatus=true;
          // this.successStatus=false;
          this.message=resp.ErrorMessage;
          this.message=resp.message;
          this.customToastrService.GetErrorToastr(this.message, "Company List Status", 5000)

      }

    },   (error: AppResponse) => {


      this.errorHandlingService.errorStatus(error,"Entity List Status")

}
)


   }

  ngOnInit() {
  }

}
