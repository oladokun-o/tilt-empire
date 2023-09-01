import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Event, events_query } from 'src/app/core/models/products.model';
import { EventsService } from 'src/app/core/services/events.service';

@Component({
  selector: 'app-upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.scss']
})
export class UpcomingEventsComponent implements OnInit {

  events: Event[] = [];
  nextEventId: string = '3d8a73af-56a7-4fc5-969b-8aa37dcab459';
  nextEvent!: Event;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private eventService: EventsService,
    public toastr: ToastrService
  ) {
    if (this.events.length === 0) {
      if (route.snapshot.data.event) {
        this.events = route.snapshot.data.event.result;
        this.nextEvent = this.events.find(event => event._id === this.nextEventId)!;
        this.events = this.events.filter(event => event._id !== this.nextEventId);
      }
      else this.getEvents();
    }
  }

  ngOnInit(): void {
  }

  getEvents() {
    this.eventService.get(events_query).subscribe({
      next: (result) => {
        this.events = result.result;
        this.nextEvent = this.events.find(event => event._id === this.nextEventId)!;
        this.events = this.events.filter(event => event._id !== this.nextEventId);
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

  convertTime(date: Date) {
    //convert date object to time in am/pm format
    let hours = new Date(date.toString()).getHours();
    let minutes = new Date(date.toString()).getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    let minutesStr = minutes < 10 ? '0' + minutes : minutes;
    let strTime = hours + ':' + minutesStr + ' ' + ampm;
    return strTime;
  }

}
