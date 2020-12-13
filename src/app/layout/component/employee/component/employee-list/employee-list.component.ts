import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AppResponse } from 'src/app/models/appResponse';
import { CustomToastrService } from 'src/app/service/customToastr.service';
import { ErrorHandlingService } from 'src/app/service/error-handling.service';
import { EmployeeService } from '../../service/employee.service';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';

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
    private errorHandlingService: ErrorHandlingService,private dialog: MatDialog,) {

      let Role = sessionStorage.getItem('ROLE');

      console.log(Role)

      if(Role == "ADMIN_IT")
      {
        this.passwords=true
        this.employeeService.getEmployeForIt().subscribe(resp =>{

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


      else
      {

        this.passwords=false
        this.employeeService.getAllEmployeForOther().subscribe(resp =>{

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
    
   }

  ngOnInit() {
  }


  update(data)
  {
     console.log(data)

     const dialogConfig = new MatDialogConfig();
     dialogConfig.autoFocus = true;
     dialogConfig.disableClose = true;
     dialogConfig.width="50%";
     dialogConfig.data={data}
     this.dialog.open(EditEmployeeComponent, dialogConfig).afterClosed().subscribe(res =>{
 
 
     });
  }

}
