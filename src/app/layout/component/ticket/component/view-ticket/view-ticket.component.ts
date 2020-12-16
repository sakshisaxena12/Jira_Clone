import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppResponse } from 'src/app/models/appResponse';
import { CustomToastrService } from 'src/app/service/customToastr.service';
import { ErrorHandlingService } from 'src/app/service/error-handling.service';
import { TicketService } from '../../service/ticket.service';

@Component({
  selector: 'app-view-ticket',
  templateUrl: './view-ticket.component.html',
  styleUrls: ['./view-ticket.component.css']
})
export class ViewTicketComponent implements OnInit {

  boardId;
  ticketId;
  message;

  boardDetails: any ={}
  newboardDetails: any ={}
  employee:any[]=[]

  constructor(private errorHandlingService: ErrorHandlingService,     
    private customToastrService: CustomToastrService,
    private ticketService: TicketService,private route: ActivatedRoute,
    private router: Router) {

      this.boardId = this.route.snapshot.paramMap.get('boardId');
      this.ticketId = this.route.snapshot.paramMap.get('ticketId');

      console.log(this.boardId)
      console.log(this.ticketId)



    this.ticketService.getTheTeamempolyee(this.boardId).subscribe(resps =>{

      console.log(resps)

      if(resps.status)
      {
        this.employee = resps.team
        console.log(this.employee)

        // console.log(console.log(this.BoardId))
      }
      else
      { 
          
          this.message=resps.message;
          this.customToastrService.GetErrorToastr(this.message, "Employee List Status", 5000)

      }

    },   (error: AppResponse) => {


      this.errorHandlingService.errorStatus(error,"Entity List Status")

}
)



      this.ticketService.toGetParticularTicket(this.boardId,this.ticketId).subscribe(resp =>{

        console.log(resp)
  
        if(resp.status)
        {
          this.boardDetails = resp.ticket

          console.log(this.boardDetails[0])

          for(let x=0; x<this.boardDetails.mainFieldsValue.length;x++)
          {
            if(this.boardDetails.mainFieldsValue[x].Title == "title")
            {
              this.newboardDetails.Title = this.boardDetails.mainFieldsValue[x].Value
            }

            if(this.boardDetails.mainFieldsValue[x].Title == "subTitle")
            {
              this.newboardDetails.SubTitle = this.boardDetails.mainFieldsValue[x].Value
            }
            
            if(this.boardDetails.mainFieldsValue[x].Title == "description")
            {
              this.newboardDetails.Description = this.boardDetails.mainFieldsValue[x].Value
            }

          }

          for(let x=0; x<this.boardDetails.subFieldsValue.length;x++)
          {
            if(this.boardDetails.subFieldsValue[x].Title == "Priority")
            {
              this.newboardDetails.Priority = this.boardDetails.subFieldsValue[x].Value
              if(this.newboardDetails.Priority == "Low")
              {
                this.newboardDetails.color = "green"
              }

              if(this.newboardDetails.Priority == "Medium")
              {
                this.newboardDetails.color = "yellow"
              }

              if(this.newboardDetails.Priority == "High")
              {
                this.newboardDetails.color = "red"
              }
            }

          }

          // "High","Low","Medium"

          this.newboardDetails.Developer = this.boardDetails.developer
          this.newboardDetails.Pm = this.boardDetails.pM
          this.newboardDetails.Qa = this.boardDetails.qA
          this.newboardDetails.Status = this.boardDetails.status

          console.log(this.newboardDetails)
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



  ngOnInit() {
  }


  toCheckTitleOrNot(mainFieldsValues)
  {
    
    if(mainFieldsValues.Title == "title")
    {
      return true
    }

    else{
      return false
    }
  }

}
