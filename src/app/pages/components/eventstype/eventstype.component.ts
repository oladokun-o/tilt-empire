import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Event } from 'src/app/core/models/products.model';

@Component({
  selector: 'app-eventstype',
  templateUrl: './eventstype.component.html',
  styleUrls: ['./eventstype.component.scss']
})
export class EventstypeComponent implements OnInit, OnChanges {

  @Input()
  events: Event[] = [];

  pastEvents: Event[] = [];
  upcomingEvents: Event[] = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.events && changes.events.currentValue) {
      this.upcomingEvents = changes.events.currentValue.filter((event: any) => new Date(event.datetime.toString()) > new Date());
      this.pastEvents = changes.events.currentValue.filter((event: any) => new Date(event.datetime.toString()) < new Date());
    }
  }

  ngOnInit(): void {
    this.upcomingEvents = this.events.filter(event => new Date(event.datetime.toString()) > new Date());
    this.pastEvents = this.events.filter(event => new Date(event.datetime.toString()) < new Date());

    console.log(this.upcomingEvents);
   }

  convertToDate(iso: Date) {

    return new Date(iso.toString()).getDate();
  }

  convertToDay(iso: Date) {
    let date = new Date(iso.toString());
    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];
  }

  convertToMonth(iso: Date) {
    let date = new Date(iso.toString());
    return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][date.getMonth()];
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

  checkIfEventHasPassed(event: Event): boolean {
    let eventDate = new Date(event.datetime.toString());
    let today = new Date();
    return eventDate < today;
  }

}
