import { Event, events_query } from './../../core/models/products.model';
import { ToastrService } from 'ngx-toastr';
import { EventsService } from './../../core/services/events.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShoppingCartComponent } from 'src/app/shared/modals/shopping-cart/shopping-cart.component';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  events: Event[] = [];
  event!: Event;
  event_id!: string;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private eventService: EventsService,
    public toastr: ToastrService,
    public modalService: NgbModal,
    public titleService: Title
  ) {
    if (route.snapshot.data.events.result.length !== 0) this.events = route.snapshot.data.events.result;
    else this.getEvents();

    if (route.snapshot.data.event.result.length !== 0) {
      this.event = route.snapshot.data.event.result[0];
      this.event_id = this.event._id;
      this.titleService.setTitle('TILT Empire presents: ' + this.event.title);
    }
    else {
      route.params.subscribe((params: Params) => {
        this.event_id = params['id'];
      })
      this.getEvent(this.event_id);
    }
  }

  showShoppingCart(event: Event) {
    //const ref = this.modalService.open(ShoppingCartComponent);
    //ref.componentInstance.event = event;
    location.href = 'https://book.stripe.com/test_4gw15V32LaSyfh6aEE';
  }


  ngOnInit(): void {
  }

  getEvents() {
    this.eventService.get(events_query).subscribe({
      next: (result) => {
        this.events = result.result;
      },
      error: (error) => {
        this.toastr.error(error || 'An error occured, please refresh the application')
      }
    })
  }

  getEvent(id: string) {
    let query = `*[_id == '${id}']{
      title,
      _id,
      description,
      price,
      vip_price,
      currency,
      'imageUrl': image.asset->url,
      datetime,
      stock,
      checkout_link,
      checkout_link_vip
    }`;

    this.eventService.get(query).subscribe({
      next: (result) => {
        this.event = result.result[0];
        this.titleService.setTitle('TILT Empire presents: ' + this.event.title);
      },
      error: (error) => {
        this.toastr.error(error || 'An error occured, please refresh the application')
      }
    })
  }

  payout(type: string) {
    if (type === 'reg') location.href = this.event.checkout_link
    else if (type === 'vip' && this.event.checkout_link_vip) location.href = this.event.checkout_link_vip
  }

  convertToDate(iso: Date) {

    return new Date(iso.toString()).getDate();
  }

  convertToDay(iso: Date) {
    let date = new Date(iso.toString());
    return [ 'Sun', 'Mon','Tue','Wed','Thu', 'Fri','Sat'][date.getDay()];
  }

  convertToMonth(iso: Date) {
    let date = new Date(iso.toString());
    return ['January', 'February', 'March', 'April', 'May','June','July', 'August', 'September', 'October', 'November', 'December'][date.getMonth()];
  }

  convertToYear(iso: Date) {

    return new Date(iso.toString()).getFullYear();
  }

  convertTime(iso: Date) {
    let date = new Date(iso.toString());
    return date.getHours() + ' : ' + date.getMinutes();
  }
}
