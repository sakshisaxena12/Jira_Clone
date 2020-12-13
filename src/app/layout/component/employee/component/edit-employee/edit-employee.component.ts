import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppResponse } from 'src/app/models/appResponse';
import { CustomToastrService } from 'src/app/service/customToastr.service';
import { ErrorHandlingService } from 'src/app/service/error-handling.service';
import { EmployeeService } from '../../service/employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  editRole: any[]=[]
  board:any[]=[]
  message;

  constructor(@Inject(MAT_DIALOG_DATA) public data,
  public dialogRef: MatDialogRef<EditEmployeeComponent>,
  private employeeService:EmployeeService,private customToastrService: CustomToastrService,
  private errorHandlingService: ErrorHandlingService) {


    this.employeeService.ToGetBoard().subscribe(resp =>{

      console.log(resp)

      if(resp.status)
      {
        this.board = resp.boards
        console.log(this.board)
      }
      else
      { 
          this.message=resp.ErrorMessage;
          this.message=resp.message;
          this.customToastrService.GetErrorToastr(this.message, "Employee List Status", 5000)

      }

    },   (error: AppResponse) => {


      this.errorHandlingService.errorStatus(error,"Entity List Status")

}
)





    console.log(data)
   }

  ngOnInit() {
  }

}
