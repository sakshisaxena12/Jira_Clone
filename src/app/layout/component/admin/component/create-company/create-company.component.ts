import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { AppResponse } from 'src/app/models/appResponse';
import { CustomToastrService } from 'src/app/service/customToastr.service';
import { ErrorHandlingService } from 'src/app/service/error-handling.service';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent implements OnInit {

  company:any[]=[]
 
  imageUpload;

  message


  constructor(private errorHandlingService: ErrorHandlingService,     
    private customToastrService: CustomToastrService,
    private adminService: AdminService) { 
    
  }

  ngOnInit() {
  }

  imagefileupload(file:FileList)
  {
    this.imageUpload = file[0];
    console.log(this.imageUpload)

  }

  AddCompany(data)
  {

    let userID= sessionStorage.getItem("userID")
    console.log(data)
    let contact = {
      "code": data.code,
      "number": data.number
    }

    let defaultCreds = {
      "userIT":data.userIT,
      "passwordIT": data.passwordIT,
      "userHR":data.userHR,
      "passwordHR": data.passwordHR
    }

    let fileToUpload = this.imageUpload

    let formData = new FormData();
    formData.append('logo', fileToUpload, fileToUpload.name);
    formData.append('name',data.name)
    formData.append('userId',userID)

    
    formData.append('contact',JSON.stringify(contact))
    formData.append('defaultCreds',JSON.stringify(defaultCreds))
    
    console.log(formData.getAll('logo'))

    
   

    // let newcompany = {
    //   "name":data.name,
    //   "userId": userID,
    //   "logo": formData,
    //   "contact": JSON.stringify(contact),
    //   "defaultCreds": JSON.stringify(defaultCreds) 
    // }

    // console.log(newcompany)


    this.adminService.AddComapny(formData).subscribe(resp => {

      console.log(resp)
     
      if(resp.status)
      {
        // this.successStatus=true;
        // this.dangerStatus=false;
        this.message="Company is Added successfully"

        this.customToastrService.GetSuccessToastr(this.message, "Company Save Status", 5000)
      }
      else
      {
        // this.dangerStatus=true;
        // this.successStatus=false;
        this.message=resp.Message;
      }
      
    }
    ,   (error: AppResponse) => {
      console.log(error)
      this.errorHandlingService.errorStatus(error,"Company Status")

}
)


    
    
  }

}
