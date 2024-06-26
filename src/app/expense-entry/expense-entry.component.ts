import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MongoClient, ServerApiVersion } from 'mongodb';



@Component({
  selector: 'app-expense-entry',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expense-entry.component.html',
  styleUrl: './expense-entry.component.css'
})
export class ExpenseEntryComponent implements OnInit {
  title: string[] = [];
  constructor() { } 
  ngOnInit() { 
     this.title = ["Expense Entry way"] 
  } 

  showData($event: any){ 

    console.log("run");

 }

}