import { ToastrService } from 'ngx-toastr';
import { EventsService } from '../../core/services/events.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { Event, events_query } from 'src/app/core/models/products.model';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewChecked {

  events: Event[] = [];
  event!: Event;
  event_query: string = `*[_type == 'next_event']{    title,    _id,    description,    price,    vip_price,    currency,    'imageUrl': image.asset->url,    datetime,    stock,    checkout_link,    checkout_link_vip,    location,    tags  }`;
  images: Array<{ src: string; }> = [];
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];

  // @ViewChild('video') video!: ElementRef<HTMLVideoElement>;

  constructor (
    public router: Router,
    public route: ActivatedRoute,
    private eventService: EventsService,
    public toastr: ToastrService
  ) {
    if (route.snapshot.data?.events.result.length !== 0) this.events = route.snapshot.data.events.result;
    else this.getEvents();

    if (route.snapshot.data.next_event.result.length !== 0) this.event = route.snapshot.data.next_event.result[0];
    else this.getNextEvent();

    for (let i = 0; i < 12; i++) {
      const src = 'assets/gallery/TILT (' + (i + 1) + ' of 210).jpg';
      const image = { src: src };
      this.images.push(image);
    }
  }

  ngOnInit(): void {

  }

  ngAfterViewChecked(): void {
    // if (this.video) {
    //   setTimeout(() => {
    //     this.video.nativeElement.scrollIntoView();
    //   }, 1500);
    // }
  }

  getEvents() {
    this.eventService.get(events_query).subscribe({
      next: (result) => {
        this.events = result.result;
      },
      error: (error) => {
        this.toastr.error(error || 'An error occured, please refresh the application');
      }
    });
  }

  getNextEvent() {
    this.eventService.get(this.event_query).subscribe({
      next: (result) => {
        this.event = result.result[0];
      },
      error: (error) => {
        this.toastr.error(error || 'An error occured, please refresh the application');
      }
    });
  }
  pay: boolean = false;
  showShoppingCart(event?: Event) {
    //const ref = this.modalService.open(ShoppingCartComponent);
    //ref.componentInstance.event = event;
    //location.href = 'https://book.stripe.com/test_4gw15V32LaSyfh6aEE';
    if (this.pay) this.pay = false;
    else this.pay = true;
  }

  payout(type: string) {
    if (type === 'reg') location.href = this.event.checkout_link;
    else if (type === 'vip' && this.event.checkout_link_vip) location.href = this.event.checkout_link_vip;
  }

}
