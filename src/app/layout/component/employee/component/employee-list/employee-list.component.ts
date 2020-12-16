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

  Employee:any[]=[]
  message

  passwords=true;
  edit=true;
  deletes=true;
  Addemployee=true;

  teamData: any 

  toUpdateTeamId;


  fileToUpload: File = null;

  constructor(private employeeService: EmployeeService,private customToastrService: CustomToastrService,
    private errorHandlingService: ErrorHandlingService,private dialog: MatDialog) {

      this.consData();
    
   }

  ngOnInit() {
  }

  computeActive(data)
  {
    
    this.employeeService.getAllEmployeForOther().subscribe(resp =>{

      // console.log(resp)

      if(resp.status)
      {
        this.Employee = resp.employees

        for(let i=0; i<this.Employee.length; i++)
        {
          this.Employee[i].isActive=false
        }

        for(let y=0; y<this.teamData.length; y++)
        {
          let a = this.Employee.findIndex(x => x.id === this.teamData[y].id)
          if(a!=-1)
          {
            this.Employee[a].isActive=true
          }

        }
         console.log(this.Employee)
        // console.log(this.teamData)
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
  }

  getTeam(BoardIdForSM)
  {
    this.employeeService.toGetTeamInsideBoard(BoardIdForSM).subscribe(resp =>{

      console.log(resp)

      if(resp.status)
      {
        this.teamData = resp.team
        this.computeActive(this.teamData);

        // console.log(this.teamData)
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



  consData()
  {
    let Role = sessionStorage.getItem('ROLE');

      // console.log(Role)

      if(Role == "ADMIN_IT")
      {
        this.passwords=true
        this.edit=false
        this.deletes = true
        this.Addemployee=false;

        this.employeeService.getEmployeForIt().subscribe(resp =>{

          // console.log(resp)
    
          if(resp.status)
          {
            this.Employee = resp.employees
            // console.log(this.Employee)
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


      else if (Role == "ADMIN_HR")
      {
        this.edit=true;
        this.passwords=false
        this.deletes=false
        this.Addemployee=false
        this.employeeService.getAllEmployeForOther().subscribe(resp =>{

          // console.log(resp)
    
          if(resp.status)
          {
            this.Employee = resp.employees
            // console.log(this.Employee)
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


      else if (Role == "SCRUM_MASTER")
      {
        this.edit=false;
        this.passwords=false
        this.deletes=false
        this.Addemployee=true;

        this.employeeService.toGetAllBoardsForSM().subscribe(resp =>{

          console.log(resp)
    
          if(resp.status)
          {
            this.toUpdateTeamId = resp.boards[0].id
            this.getTeam(this.toUpdateTeamId)
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
    
      }

      else
      {
        this.edit=false;
        this.passwords=false
        this.deletes=false
        this.Addemployee=false
        this.employeeService.getAllEmployeForOther().subscribe(resp =>{

          // console.log(resp)
    
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


  update(data)
  {
    //  console.log(data)

     const dialogConfig = new MatDialogConfig();
     dialogConfig.autoFocus = true;
     dialogConfig.disableClose = true;
     dialogConfig.width="50%";
     dialogConfig.data={data}
     this.dialog.open(EditEmployeeComponent, dialogConfig).afterClosed().subscribe(res =>{

      this.consData()
 
 
     });
  }

  updateTheTeam(employeeId)
  {
    let data ={
      "empId" : employeeId
    }
    console.log(data)
    console.log(this.toUpdateTeamId)

    this.employeeService.toAddTeamMemmber(this.toUpdateTeamId, data).subscribe(resp => {

      console.log(resp)
     
      if(resp.status)
      {
        this.message="Data is Added successfully"

        this.customToastrService.GetSuccessToastr(this.message, "Employee Save Status", 5000)

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

  delete(data)
  {

    this.employeeService.DeleteEmployee(data.id).subscribe(resp =>{

      // console.log(resp)

      if(resp.status)
      {
        this.message="Employee delete successfully"
        this.customToastrService.GetSuccessToastr(this.message, "Employee Save Status", 3000)
        this.consData()
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



  fileupload(file:FileList)
  {
    // console.log(file)

    this.fileToUpload = file[0];

    console.log(this.fileToUpload)


        this.employeeService.AddEmployeeInBulk(this.fileToUpload).subscribe(resp => {

          // console.log(resp)
         
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
          // console.log(error)
          this.errorHandlingService.errorStatus(error,"Employer Status")
    
    }
        )    
    
  }



  deleteEmployee(file:FileList)
  {
    // console.log(file)

    this.fileToUpload = file[0];

    console.log(this.fileToUpload)


        this.employeeService.DeleteEmployeeInBulk(this.fileToUpload).subscribe(resp => {

          // console.log(resp)
         
          if(resp)
          {
            this.consData()
            
            this.message="Data is deleted successfully"
    
            this.customToastrService.GetSuccessToastr(this.message, "Employee Save Status", 5000)
    
          }
          else
          {
           
            // this.message=resp
          }
          
        }
        ,   (error: AppResponse) => {
          // console.log(error)
          this.errorHandlingService.errorStatus(error,"Employer Status")
    
    }
        )    
    
  }

}
