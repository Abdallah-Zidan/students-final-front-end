import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  constructor() { }


  displayedColumns: string[] = ['id', 'title', 'body', 'user_id' , 'delete'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

}

export interface PeriodicElement {
  id: number;
  title: string;
  body: string;
  user_id: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, title: 'Hydrogen', body: 'sdsdd dssd', user_id: 1 },
  { id: 1, title: 'Hydrogen', body: 'sdsdd dssd', user_id: 1 },
  { id: 1, title: 'Hydrogen', body: 'sdsdd dssd', user_id: 1 },
  { id: 1, title: 'Hydrogen', body: 'sdsdd dssd', user_id: 1 },
];
