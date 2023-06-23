import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ElementRef, Inject } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LightboxComponent } from '../shared/lightbox/lightbox.component';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  loading: boolean = true;
  currentRoute: string = '';
  constructor(
    public router: Router,
    private cdr: ChangeDetectorRef,
    public modalService: NgbModal,
    @Inject(DOCUMENT) private document: Document,
    ) {
    router.events.subscribe((event) => {
      this.currentRoute = router.url.replace('/', '');
      if (event instanceof NavigationStart) {
        this.loading = true;
      } else if (event instanceof NavigationEnd) {
        this.loading = false;
      }
      }
    );
  }

  ngOnInit(): void {
    this.document.addEventListener('click', (event) => {
      event.preventDefault();
      let image: HTMLImageElement,
          images: NodeListOf<HTMLImageElement> = this.document.querySelectorAll('img.gallery');
      if (event.target instanceof HTMLImageElement && event.target?.classList?.contains('gallery')) {
        image = <HTMLImageElement>event?.target;
        const ref = this.modalService.open(LightboxComponent, { centered: true });
        ref.componentInstance.image = image;
        ref.componentInstance.images = images;
      }
    })
  }
}
