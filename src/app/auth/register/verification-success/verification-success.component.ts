import { Component, OnInit } from '@angular/core';
import AOS from 'aos'

@Component({
  selector: 'app-verification-success',
  templateUrl: './verification-success.component.html',
  styleUrls: ['./verification-success.component.scss']
})
export class VerificationSuccessComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    AOS.init();
  }

}
