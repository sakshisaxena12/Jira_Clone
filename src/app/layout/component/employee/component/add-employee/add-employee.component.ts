import { Component, OnInit } from '@angular/core';
import { AppResponse } from 'src/app/models/appResponse';
import { CustomToastrService } from 'src/app/service/customToastr.service';
import { ErrorHandlingService } from 'src/app/service/error-handling.service';
import { Employee } from '../../model/employee';
import { EmployeeService } from '../../service/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  employee: Employee

  message

  fileToUpload: File = null;

  constructor( private errorHandlingService: ErrorHandlingService,     
    private customToastrService: CustomToastrService,
    private employeeService: EmployeeService) { 

      
      this.employee = 
      {
        name: null,
        email: null,
        date: null,
        phone: null,
        password:null,
        address: null,
      }
    }

  AddEmployee(data)
  {

    const newdata={
      name: data.name,
      email: data.email,
      password: data.password
    }

    console.log(newdata)
    
    this.employeeService.EmployeeDataSave(newdata).subscribe(resp => {

      console.log(resp)
     
      if(resp.status)
      {
        // this.successStatus=true;
        // this.dangerStatus=false;
        this.message="Data is Added successfully"

        this.customToastrService.GetSuccessToastr(this.message, "Employee Save Status", 5000)


        setTimeout(()=>
        {    

          // this.successStatus=false;
          // this.dangerStatus=false;

          this.employee = 
          {
            name: null,
            email: null,
            date: null,
            password: null,
            phone: null,
            address: null,
          }
      
        }, 3000);
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
      this.errorHandlingService.errorStatus(error,"Employer Status")

}
)

  }

  ngOnInit() {
  }

  

  fileupload(file:FileList)
  {

    console.log(file)
    

    this.fileToUpload = file[0];

    console.log(this.fileToUpload)


        this.employeeService.AddEmployeeInBulk(this.fileToUpload).subscribe(resp => {

          console.log(resp)
         
          if(resp)
          {
            
            this.message="Data is Added successfully"
    
            this.customToastrService.GetSuccessToastr(this.message, "Employee Save Status", 5000)
    
          }
          else
          {
           
            // this.message=resp
          }
          
        }
        ,   (error: AppResponse) => {
          console.log(error)
          this.errorHandlingService.errorStatus(error,"Employer Status")
    
    }
        )    




    
    
  }

}
