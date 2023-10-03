import { DOCUMENT } from '@angular/common';
import { Component, OnInit, ElementRef, Inject, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AboutUs, LastVideo } from 'src/app/core/models/index.model';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  @Input()
  about!: AboutUs;

  @Input()
  lastvideo!: LastVideo;

  constructor(@Inject(DOCUMENT) private document: Document, private sanitizer: DomSanitizer) { }

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

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
