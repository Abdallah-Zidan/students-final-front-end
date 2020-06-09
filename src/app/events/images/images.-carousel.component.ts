import {Component} from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-images-carousel',
  templateUrl: './images-carousel.html',
  providers: [NgbCarouselConfig]  // add NgbCarouselConfig to the component providers
})
export class ImagesCarouselComponent {
  showNavigationArrows = false;
  showNavigationIndicators = false;
  images = [1055, 194, 368].map((n) => `https://picsum.photos/id/${n}/900/500`);

  constructor(config: NgbCarouselConfig) {
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
  }
}