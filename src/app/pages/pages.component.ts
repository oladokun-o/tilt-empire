import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ElementRef, Inject } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LightboxComponent } from '../shared/lightbox/lightbox.component';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit, AfterViewChecked {
  loading: boolean = true;
  currentRoute: string = '';
  constructor (
    public router: Router,
    private cdr: ChangeDetectorRef,
    public modalService: NgbModal,
    @Inject(DOCUMENT) private document: Document,
  ) {
    router.events.subscribe((event) => {
      this.currentRoute = router.url.replace('/', '');
      if (event instanceof NavigationStart) {
        this.loading = true;
        this.ngAfterViewChecked();
      } else if (event instanceof NavigationEnd) {
        this.loading = false;
        this.ngAfterViewChecked();
      }
    }
    );
  }

  ngAfterViewChecked(): void {
    let aS = this.document.querySelectorAll('a');
    aS.forEach(a => {
      if (a.href.includes('facebook') || a.href.includes('instagram')) {
        // console.log(a);
        a.addEventListener('click', () => {
          window.open(a.href, '_blank');
        });
      }
    });

    const LongstringHelper = (str: any) => {
      const sliceBoundary = (str: any) => str.substr(0, str.lastIndexOf(" "));
      const truncate = (n: number, useWordBoundary: any) =>
        str.length <= n ? str : `${useWordBoundary
          ? sliceBoundary(str.slice(0, n - 1))
          : str.slice(0, n - 1)}&hellip;`;
      return { full: str, truncate };
    };

    let descs = this.document.querySelectorAll(".desc");
    descs.forEach(desc => {
      let descText = desc.innerHTML;
      let descTextTruncated = LongstringHelper(descText).truncate(300, true);
      desc.innerHTML = descTextTruncated;
    });
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
    });
  }
}
