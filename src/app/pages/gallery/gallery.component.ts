import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  images: Array<{ src: string }> = [];
  constructor(@Inject(DOCUMENT) private document: Document) {
    for (let i = 0; i < 20; i++) {
      const src = 'assets/gallery/TILT (' + (i+1) + ' of 210).jpg';
      const image = { src: src };
      this.images.push(image);
    }
   }

  ngOnInit(): void {
    let docs = this.document.querySelectorAll('a');
    docs.forEach(a => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
      })
    })
  }

}
