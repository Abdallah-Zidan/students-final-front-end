import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor() { }


  displayedColumns: string[] = ['id', 'name', 'type', 'email', 'mobile', 'address', 'edit', 'delete'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

}

export interface PeriodicElement {
  id: number;
  name: string;
  type: string;
  email: string;
  mobile: number;
  address: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, name: 'adas', type: 'admin', email: 'sasas@asas.com', mobile: 64646, address: 'dsdd' },
  { id: 1, name: 'adas', type: 'admin', email: 'sasas@asas.com', mobile: 64646, address: 'dsdd' },
  { id: 1, name: 'adas', type: 'admin', email: 'sasas@asas.com', mobile: 64646, address: 'dsdd' },
  { id: 1, name: 'adas', type: 'admin', email: 'sasas@asas.com', mobile: 64646, address: 'dsdd' },
  { id: 1, name: 'adas', type: 'admin', email: 'sasas@asas.com', mobile: 64646, address: 'dsdd' },
  { id: 1, name: 'adas', type: 'admin', email: 'sasas@asas.com', mobile: 64646, address: 'dsdd' },
  { id: 1, name: 'adas', type: 'admin', email: 'sasas@asas.com', mobile: 64646, address: 'dsdd' },
  { id: 1, name: 'adas', type: 'admin', email: 'sasas@asas.com', mobile: 64646, address: 'dsdd' },


];

