import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatTreeNestedDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';

interface Node {
  name: string;
  children?: Node[];
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-nested-tree',
  templateUrl: './nested-tree.component.html',
  styleUrls: ['./nested-tree.component.scss'],
})

export class NestedTreeComponent {

  nestedTreeControl: NestedTreeControl<Node>;
  nestedDataSource: MatTreeNestedDataSource<Node>;
  dataChange: BehaviorSubject<Node[]> = new BehaviorSubject<Node[]>([]);

  constructor() {
    this.nestedDataSource = new MatTreeNestedDataSource<Node>();
    this.nestedTreeControl = new NestedTreeControl<Node>(node => node.children);
    this.dataChange.subscribe(data => this.nestedDataSource.data = data);

    this.dataChange.next([
      {
        name: 'Faculty',
        children: [
          {
            name: 'Univeristy 1',
            children: []
          }
        ]
      },
      {
        name: 'Faculty2',
        children: [
          {
            name: 'Univeristy 1',
            children: []
          }
        ]
      }
    ]);
  }

  hasNestedChild = (_: number, node: Node) => !!node.children && node.children.length > 0;
}