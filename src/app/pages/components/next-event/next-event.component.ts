import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/core/models/products.model';
import { EventsService } from 'src/app/core/services/events.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-next-event',
  templateUrl: './next-event.component.html',
  styleUrls: ['./next-event.component.scss']
})
export class NextEventComponent implements OnInit {

  event!: Event;
  events_query: string = `*[_type == 'next_event']{
    title,
    _id,
    description,
    price,
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
    public route: ActivatedRoute,
    private eventService: EventsService,
    public toastr: ToastrService
  ) {
    if (route.snapshot.data.next_event.result.length !== 0) this.event = route.snapshot.data.next_event.result[0];
    else this.getNextEvent();
  }
  ngOnInit(): void {
  }

  getNextEvent() {
    this.eventService.get(this.events_query).subscribe({
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
