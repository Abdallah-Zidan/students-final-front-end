import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import {
  MatTreeNestedDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { BehaviorSubject, Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { GroupsService } from '../services/groups.service';

interface Node {
  name: string;
  children?: Node[];
}

@Component({
  selector: 'app-nested-tree',
  templateUrl: './nested-tree.component.html',
  styleUrls: ['./nested-tree.component.scss'],
})
export class NestedTreeComponent implements OnInit {
  nestedTreeControl: NestedTreeControl<Node>;
  nestedDataSource: MatTreeNestedDataSource<Node>;
  dataChange: BehaviorSubject<Node[]> = new BehaviorSubject<Node[]>([]);

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private groupsService: GroupsService
  ) {}

  ngOnInit() {
    this.nestedDataSource = new MatTreeNestedDataSource<Node>();
    this.nestedTreeControl = new NestedTreeControl<Node>(
      (node) => node.children
    );
    this.dataChange.subscribe((data) => (this.nestedDataSource.data = data));
    if (this.groupsService.departmentGroups.length < 1) {
      this.groupsService.getGroups();
    }
    const departmentGroups = this.groupsService.departmentGroups;

    const facultyGroups = this.groupsService.facultyGroups;

    this.dataChange.next([
      {
        name: 'Department',
        children: departmentGroups,
      },
      {
        name: 'Faculty',
        children: facultyGroups,
      },
    ]);
  }
  hasNestedChild = (_: number, node: Node) =>
    !!node.children && node.children.length > 0;
}
