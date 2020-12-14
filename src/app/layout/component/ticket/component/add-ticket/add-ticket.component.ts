import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppResponse } from 'src/app/models/appResponse';
import { CustomToastrService } from 'src/app/service/customToastr.service';
import { ErrorHandlingService } from 'src/app/service/error-handling.service';
import { TicketService } from '../../service/ticket.service';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.css']
})
export class AddTicketComponent implements OnInit {

  task:any[]=[]
  BoardId
  message

  constructor(private errorHandlingService: ErrorHandlingService,     
    private customToastrService: CustomToastrService,
    private ticketService: TicketService,private route: ActivatedRoute,
    private router: Router) {

      this.route.paramMap.subscribe(params => {
        this.BoardId = params.get('boardId');
      })
      

    }

  ngOnInit() {
  
  }

  AddTask(data)
  {

    // const newdata={
    //   name: data.name,
    //   email: data.email,
    //   password: data.password
    // }

    // console.log(newdata)
    
    this.ticketService.TicketDataSave(data,this.BoardId ).subscribe(resp => {

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


}
