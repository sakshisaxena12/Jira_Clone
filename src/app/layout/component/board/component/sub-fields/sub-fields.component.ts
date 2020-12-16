import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-sub-fields',
  templateUrl: './sub-fields.component.html',
  styleUrls: ['./sub-fields.component.css']
})
export class SubFieldsComponent implements OnInit {

  
  editRole:any[]=[]
  subFieldsForTickets={}

  dropdownvalue;
  statusToShow=false;


  constructor(@Inject(MAT_DIALOG_DATA) public data,
  public dialogRef: MatDialogRef<SubFieldsComponent>) { }

  ngOnInit() {
  }


  getList(event)
  {
    this.dropdownvalue = event.target.value
    console.log(this.dropdownvalue)
    if(this.dropdownvalue == "List")
    {
      this.statusToShow=true
    }
  }



  Addmain(data)
  {
    console.log(data)

    let forData = [];
    data.item1 = data.item1;
    if(data.item1){
      forData.push(data.item1)
    }

    data.item2 = data.item2;
    if(data.item2){
      forData.push(data.item2)
    }

    data.item3 = data.item3;
    if(data.item3){
      forData.push(data.item3)
    }

    data.item4 = data.item4;
    if(data.item4){
      forData.push(data.item4)
    }

    data.item5 = data.item5;
    if(data.item5){
      forData.push(data.item5)
    }

    console.log(forData)

    if(forData.length==0)
    {
        this.subFieldsForTickets=
      {
        Title: data.title,
        Type: data.type,
      }

      console.log("yes")

    }

    else{

      this.subFieldsForTickets=
      {
        Title: data.title,
        Type: data.type,
        Items: forData 
      }

      console.log("no")

    }

    console.log(this.subFieldsForTickets)


    


  }

  close()
  {
    this.dialogRef.close({action:1, data:this.subFieldsForTickets});
  }


}
