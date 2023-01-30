import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    document.querySelector('.video-overlay, .video-overlay-close')?.addEventListener('click', (e)=> {
      e.preventDefault();
      this.close_video();
    });
    document.addEventListener('keyup', (e: KeyboardEvent) => {
      if(e.key === '27') this.close_video();
    })
  }

  openVideoModal(video_overlay: HTMLDivElement) {
    video_overlay.innerHTML = '<iframe width="560" height="315" src="https://drive.google.com/file/d/1B4XVN9GaZ4aimxm-_vE_E_Ls1R3VPALP/preview" frameborder="0" allowfullscreen></iframe>';
    video_overlay.classList.add('open');
  }

  close_video() {
    document.querySelector('.video-overlay.open')?.classList.remove('open');
    document.querySelector('.video-overlay.open')?.querySelector('iframe')?.remove();
  }
}
