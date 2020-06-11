import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-admin-posts',
  templateUrl: './admin-posts.component.html',
  styleUrls: ['./admin-posts.component.scss']
})
export class AdminPostsComponent implements OnInit {

  constructor() { }

  displayedColumns: string[] = ['id', 'body', 'reported', 'year', 'scopeable_type', 'delete'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

}

export interface PeriodicElement {
  id: number;
  body: string;
  reported: number;
  year: number;
  scopeable_type: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, body: 'Hydrogensdsdsd sdsd sd sd', reported: 0, year: 4, scopeable_type: 'faculty' },
  { id: 1, body: 'Hydrogensdsdsd sdsd sd sd', reported: 0, year: 4, scopeable_type: 'faculty' },
  { id: 1, body: 'Hydrogensdsdsd sdsd sd sd', reported: 0, year: 4, scopeable_type: 'faculty' },
  { id: 1, body: 'Hydrogensdsdsd sdsd sd sd', reported: 0, year: 4, scopeable_type: 'faculty' },
  { id: 1, body: 'Hydrogensdsdsd sdsd sd sd', reported: 0, year: 4, scopeable_type: 'faculty' },
  { id: 1, body: 'Hydrogensdsdsd sdsd sd sd', reported: 0, year: 4, scopeable_type: 'faculty' },

];
