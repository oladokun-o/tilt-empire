import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    let docs = this.document.querySelectorAll('a');
    docs.forEach(a => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
      })
    })
  }

}
