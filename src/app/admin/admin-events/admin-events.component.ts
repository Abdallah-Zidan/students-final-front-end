import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.scss']
})
export class AdminEventsComponent implements OnInit {

  constructor() { }

  displayedColumns: string[] = ['id', 'title', 'body', 'start', 'end', 'edit', 'delete'];
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
  start: string;
  end: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, title: 'Hello', body: 'Hydrogensdsdsd sdsd sd sd', start: '25-3-2202', end: '03-25-2015' },
  { id: 1, title: 'Hello', body: 'Hydrogensdsdsd sdsd sd sd', start: '25-3-2202', end: '03-25-2015' },
  { id: 1, title: 'Hello', body: 'Hydrogensdsdsd sdsd sd sd', start: '25-3-2202', end: '03-25-2015' },
  { id: 1, title: 'Hello', body: 'Hydrogensdsdsd sdsd sd sd', start: '25-3-2202', end: '03-25-2015' },
];
