import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { findAll, findByDate } from '../API_access';
import { ActivatedRoute } from  '@angular/router';


@Component({
  selector: 'app-expense-entry',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expense-entry.component.html',
  styleUrl: './expense-entry.component.css'
})
export class ExpenseEntryComponent implements OnInit {
  title: any[] = [];
  param : string | undefined = undefined; 
  loaded = false; 
  allShows : string[] = ["IN PROGRESS", "REJECTED", "PENDING", "COMPLETED"]
  showThese : Set<String> =new Set(this.allShows); 
  constructor(private route: ActivatedRoute) { } 

  ngOnInit() { 
     this.title = [] 
     this.route.queryParamMap.subscribe(function(this : ExpenseEntryComponent , params : any){  
      this.param = params.get('category');
     }.bind(this)); 
  } 

  load(s : any[]){
    console.log(s);
    this.title = [];
    var obj : any = {}; 
    s.sort((x, y) => x.date - y.date);
    for(var item of s){
      obj = {};
      obj.id = item.id;
      obj.status = item.status;
      obj.sender = `${item.sender.firstName} ${item.sender.lastName}`;
      obj.recipient = `${item.recipient.firstName} ${item.recipient.lastName}`;
      let date = new Date(item.date);
      obj.Date = `${date.getFullYear()}/${date.getMonth()}/${date.getDay()}`   
      obj.uid = item._id;
      obj.comments = item.Comments;
      this.title.push(obj); 
      console.log(obj.Date);
    }
    this.loaded = true
  }


  click($event: any){
    // date markers
    const dates : HTMLInputElement[] = Array.from(document.querySelectorAll("input.dateselect")) as HTMLInputElement[]
    console.log(dates);
    findByDate(dates[0].valueAsNumber, dates[1].valueAsNumber).then((x) => this.load(x)); 
    console.log("run");

 }
 toggleShow(evt : any , item : string ){
  if(evt.target.checked){
    this.showThese.add(item);
  } else {
    this.showThese.delete(item); 
  }
 }

}