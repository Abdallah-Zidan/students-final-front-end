import { Component, OnInit, Input } from '@angular/core';
import { Receiver } from '../../models/receiver';

@Component({
  selector: 'app-receiver-item',
  templateUrl: './receiver-item.component.html',
  styleUrls: ['./receiver-item.component.scss']
})
export class ReceiverItemComponent implements OnInit {
  @Input() receiver: Receiver;
  @Input() activated;
  @Input() blinking;
  constructor() { }

  ngOnInit(): void {
  }

}
