import { DOCUMENT } from '@angular/common';
import { Component, OnInit, ElementRef, Inject } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    let doc = this.document.querySelector('.video-overlay, .video-overlay-close')
    doc?.addEventListener('click', (e)=> {
      e.preventDefault();
      this.close_video();
    });
  }

  openVideoModal(video_overlay: HTMLDivElement) {
    video_overlay.innerHTML = '<iframe width="560" height="315" src="https://drive.google.com/file/d/1B4XVN9GaZ4aimxm-_vE_E_Ls1R3VPALP/preview" frameborder="0" allowfullscreen></iframe>';
    video_overlay.classList.add('open');
  }

  close_video() {
    let doc = this.document.querySelector('.video-overlay.open')
    doc?.classList.remove('open');
    doc?.querySelector('iframe')?.remove();
  }
}
