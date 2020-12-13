import { Component, OnInit } from '@angular/core';
import { AppResponse } from 'src/app/models/appResponse';
import { CustomToastrService } from 'src/app/service/customToastr.service';
import { ErrorHandlingService } from 'src/app/service/error-handling.service';
import { EmployeeService } from '../../service/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  Employee:any
  message
  passwords=true;

  constructor(private employeeService: EmployeeService,private customToastrService: CustomToastrService,
    private errorHandlingService: ErrorHandlingService) {

      

    this.employeeService.getAllEmployeForOther().subscribe(resp =>{

      let Role = sessionStorage.getItem('role');
      console.log(Role)

      console.log(resp)

      if(resp.status)
      {
        this.Employee = resp.employees
        console.log(this.Employee)
      }
      else
      { 
          // this.dangerStatus=true;
          // this.successStatus=false;
          this.message=resp.ErrorMessage;
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

}
