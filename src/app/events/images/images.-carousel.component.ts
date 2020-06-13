import { Component, Input, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Attachment } from 'src/app/shared/models/attachment.model';

@Component({
  selector: 'app-images-carousel',
  templateUrl: './images-carousel.html',
  providers: [NgbCarouselConfig], // add NgbCarouselConfig to the component providers
})
export class ImagesCarouselComponent implements OnInit {
  showNavigationArrows = false;
  showNavigationIndicators = false;
  @Input() files: Attachment[];
  images: string[];
  constructor(config: NgbCarouselConfig) {
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
  }
  ngOnInit() {
    console.log(this.files);

    this.images = this.files.map((file) => file.url);
  }
}
