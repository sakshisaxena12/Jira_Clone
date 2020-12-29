import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AppResponse } from 'src/app/models/appResponse';
import { CustomToastrService } from 'src/app/service/customToastr.service';
import { ErrorHandlingService } from 'src/app/service/error-handling.service';
import { EditEmployeeComponent } from '../../../employee/component/edit-employee/edit-employee.component';
import { EmployeeService } from '../../../employee/service/employee.service';
import { BoardService } from '../../service/board.service';
import { MainfieldpopComponent } from '../mainfieldpop/mainfieldpop.component';
import { SubFieldsComponent } from '../sub-fields/sub-fields.component';

@Component({
  selector: 'app-add-board',
  templateUrl: './add-board.component.html',
  styleUrls: ['./add-board.component.css']
})
export class AddBoardComponent implements OnInit {

  boards: any[]=[];
  mainfields:any[]=[]
  subFields:any[]=[]
  message

  constructor(private boardService: BoardService,private customToastrService: CustomToastrService,
    private errorHandlingService: ErrorHandlingService,private dialog: MatDialog) {

    let fields ={ 
      Title:"title",
      Type:"Text"
    }

    this.mainfields.push(fields)

    let fields1 ={ 
      Title:"subTitle",
      Type:"Text"
    }

    this.mainfields.push(fields1)

    let fields2 ={ 
      Title:"description",
      Type:"Text"
    }

    this.mainfields.push(fields2)


 

    let fields3 ={ 
      Title:"Priority",
      Type:"List",
      Items:["HIGH","LOW","MEDIUM"]
    }

    this.subFields.push(fields3)


    console.log()
    



    
    
   }

  ngOnInit() {
  }

  mainfield()
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    dialogConfig.data={}
    this.dialog.open(MainfieldpopComponent, dialogConfig).afterClosed().subscribe(res =>{

      this.mainfields.push(res.data) 

      console.log(this.mainfields)


    });

  }


  subfield()
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    dialogConfig.data={}
    this.dialog.open(SubFieldsComponent, dialogConfig).afterClosed().subscribe(res =>{

      this.subFields.push(res.data) 

      console.log(this.subFields)


    });

  }


  createBoard(data)
  {
    console.log(data)

    data.subFieldsForTickets=this.subFields
    data.mainfieldsForTickets= this.mainfields

    // let stage =["ready","dev in progress","Qa in Progress","Done"]
    // data.stages=stage

    console.log(data)


    this.boardService.CreateBoard(data).subscribe(resp => {

      console.log(resp)
     
      if(resp.status)
      {
        
        this.message="Data is Added successfully"

        this.customToastrService.GetSuccessToastr(this.message, "Employee Save Status", 5000)

      }
      else
      {
        
        this.message=resp.Message;
      }
      
    }
    ,   (error: AppResponse) => {
      console.log(error)
      this.errorHandlingService.errorStatus(error,"Employer Status")

}
)


  }

}
