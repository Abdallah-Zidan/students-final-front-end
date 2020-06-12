import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
})
export class PhotoComponent implements OnInit, AfterViewInit {
  @ViewChild('modal') modal;
  @ViewChild('img01') img01;
  @ViewChild('myImg') myImg;
  @ViewChild('caption') caption;
  @ViewChild('close') close;
  @Input() src;
  constructor() {}

  ngOnInit(): void {}
  ngAfterViewInit() {
    console.log(this.modal.nativeElement);
  }
  onclick() {
    this.modal.nativeElement.style.display = 'block';
    this.img01.nativeElement.src = this.myImg.nativeElement.src;
    this.caption.nativeElement.innerHTML = '';
  }
  onClose() {
    this.modal.nativeElement.style.display = 'none';
  }
}
