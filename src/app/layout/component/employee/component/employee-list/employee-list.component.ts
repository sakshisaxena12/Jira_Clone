import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../service/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  Employee:any

  constructor(private employeeService: EmployeeService) {

    this.employeeService.getallemployee().subscribe(resp =>{
      this.Employee = resp

      console.log(this.Employee)
    })


   }

  ngOnInit() {
  }

}
