import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lightbox',
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.scss']
})
export class LightboxComponent implements OnInit {

  image!: HTMLImageElement;
  images!: NodeListOf<HTMLImageElement>;
  slides: string[] = [];
  imagesloaded: boolean = false;
  i: number = 0;

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    let srcList: string[] = [], firstsrc: number = 0;
    this.images.forEach(image => {
      srcList.push(image.src);

      if ( this.image) {
        firstsrc = srcList.findIndex(src => { return src === this.image.src });
        this.i = firstsrc;
      }

      this.slides = [...srcList];
      this.imagesloaded = true;
    });
  }

  slide() {
    return this.slides[this.i];
  }

  next() {
    this.i = this.i===this.slides.length ? this.i : this.i + 1;
  }

  prev() {
    this.i = this.i===0 ? 0 : this.i - 1;
  }

}
