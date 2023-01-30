import { ToastrService } from 'ngx-toastr';
import { EventsService } from '../../core/services/events.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Event, events_query } from 'src/app/core/models/products.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  events: Event[] = [];
  event!: Event;
  event_query: string = `*[_type == 'next_event']{
    title,
    _id,
    description,
    price,
    currency,
    'imageUrl': image.asset->url,
    datetime,
    stock,
    checkout_link,
    location,
    tags
  }`;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private eventService: EventsService,
    public toastr: ToastrService
  ) {
    if (route.snapshot.data?.events.result.length !== 0) this.events = route.snapshot.data.events.result;
    else this.getEvents();

    if (route.snapshot.data.next_event.result.length !== 0) this.event = route.snapshot.data.next_event.result;
    else this.getNextEvent();
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

}
