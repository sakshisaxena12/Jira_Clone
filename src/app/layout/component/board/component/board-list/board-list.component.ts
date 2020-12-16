import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AppResponse } from 'src/app/models/appResponse';
import { CustomToastrService } from 'src/app/service/customToastr.service';
import { ErrorHandlingService } from 'src/app/service/error-handling.service';
import { EmployeeService } from '../../../employee/service/employee.service';
import { BoardService } from '../../service/board.service';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css']
})
export class BoardListComponent implements OnInit {


  boardList: any[]=[]
  message

  constructor(private boardService: BoardService,private customToastrService: CustomToastrService,
    private errorHandlingService: ErrorHandlingService,private dialog: MatDialog) { 

    this.boardService.getBoards().subscribe(resp =>{

      console.log(resp)

      if(resp.status)
      {
        this.boardList = resp.boards
        console.log(this.boardList)
      }
      else
      { 
          // this.dangerStatus=true;
          // this.successStatus=false;
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


  delete(data)
  {

    this.boardService.deleteBoards(data.id).subscribe(resp =>{

      console.log(resp)

      if(resp.status)
      {
        this.message="Employee delete successfully"
    
        this.customToastrService.GetSuccessToastr(this.message, "Employee Save Status", 3000)
        
        
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
