import { ToastrService } from 'ngx-toastr';
import { EventsService } from '../../core/services/events.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Event, events_query } from 'src/app/core/models/products.model';
import { ShoppingCartComponent } from 'src/app/shared/modals/shopping-cart/shopping-cart.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  events: Event[] = [];
  event!: Event;
  event_query: string = `*[_type == 'next_event']{
    title,
    _id,
    description,
    price,,
    vip_price,
    currency,
    'imageUrl': image.asset->url,
    datetime,
    stock,
    checkout_link,
    checkout_link_vip,
    location,
    tags
  }`;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private eventService: EventsService,
    public toastr: ToastrService,
    public modalService: NgbModal
  ) {
    if (route.snapshot.data?.events.result.length !== 0) this.events = route.snapshot.data.events.result;
    else this.getEvents();

    if (route.snapshot.data.next_event.result.length !== 0) this.event = route.snapshot.data.next_event.result[0];
    else this.getNextEvent();
  }

  showShoppingCart(event: Event) {
    const ref = this.modalService.open(ShoppingCartComponent);
    ref.componentInstance.event = event;
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

  getNextEvent() {
    this.eventService.get(this.event_query).subscribe({
      next: (result) => {
        this.event = result.result[0];
      },
      error: (error) => {
        this.toastr.error(error || 'An error occured, please refresh the application')
      }
    })
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
