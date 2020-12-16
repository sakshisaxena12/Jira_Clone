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
  dropdownvalue;
  statusToShow=false;

  message;

  constructor(@Inject(MAT_DIALOG_DATA) public data,
  public dialogRef: MatDialogRef<EditEmployeeComponent>,
  private employeeService:EmployeeService,private customToastrService: CustomToastrService,
  private errorHandlingService: ErrorHandlingService) {


    this.editRole = data.data

    


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

this.editRole = data.data

    console.log(data)
   }

  ngOnInit() {
  }

  getList(event)
  {
    this.dropdownvalue = event.target.value
    console.log(this.dropdownvalue)
    if(this.dropdownvalue == "SCRUM_MASTER")
    {
      this.statusToShow=true
    }
  }

  close()
  {
    this.dialogRef.close();
  }


  UpdateRoles(data)
  {
    let newData={}
    console.log(data)

    if(data.boardId)
    {
      newData ={
        email:data.email,
        role:data.roles,
        boardId:data.boardId
      }

    }

    else
    {
      newData ={
        email:data.email,
        role:data.roles
      }
    }

    console.log(newData)
    

    this.employeeService.updateTheRole(newData).subscribe(resp => {

      console.log(resp)
     
      if(resp.status)
      {
        // this.successStatus=true;
        // this.dangerStatus=false;
        this.message="Data is Added successfully"

        this.customToastrService.GetSuccessToastr(this.message, "Employee Save Status", 5000)
      }
      else
      {
        
        this.message=resp.message;
        this.customToastrService.GetErrorToastr(this.message, "Employee List Status", 5000)
      }
      
    }
    ,   (error: AppResponse) => {
      console.log(error)
      this.errorHandlingService.errorStatus(error,"Employer Status")

}
)

  }

}
