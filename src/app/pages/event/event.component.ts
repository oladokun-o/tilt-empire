import { Event, events_query } from './../../core/models/products.model';
import { ToastrService } from 'ngx-toastr';
import { EventsService } from './../../core/services/events.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShoppingCartComponent } from 'src/app/shared/modals/shopping-cart/shopping-cart.component';


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
    public modalService: NgbModal
  ) {
    if (route.snapshot.data.events.result.length !== 0) this.events = route.snapshot.data.events.result;
    else this.getEvents();

    if (route.snapshot.data.event.result.length !== 0) {
      this.event = route.snapshot.data.event.result[0];
      this.event_id = this.event._id;
    }
    else {
      route.params.subscribe((params: Params) => {
        this.event_id = params['id'];
      })
      this.getEvent(this.event_id);
    }
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
      checkout_link
    }`;

    this.eventService.get(query).subscribe({
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
