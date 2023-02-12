import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EventsService } from 'src/app/core/services/events.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  saving: boolean = false;
  saved: boolean = false;
  failed: boolean = false;
  date: Date = new Date();

  bookform: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.email, Validators.required]),
    party: new FormControl(null, Validators.required),
    people: new FormControl(null, Validators.required)
  });

  sponsorform: FormGroup = new FormGroup({
    Email: new FormControl(null, [Validators.email, Validators.required]),
    Time: new FormControl(null)
  })

  constructor(
    public eventService: EventsService,
    public toastr: ToastrService
    ) { }

  ngOnInit(): void {
  }

  save() {
    if (this.bookform.valid) {
      this.bookform.get('Time')?.patchValue(this.date.toLocaleTimeString())
      this.bookform.disable();
      this.saving = true;
      this.eventService.submitnews(this.bookform.value).subscribe(
        (response: any) => {
          this.toastr.success('We will get in touch shortly');
          this.bookform.enable();
          this.saving = false;
          this.saved = true;
          setTimeout(() => {
            this.saved = false;
          }, 2000);
        },
        (error: any) => {
          this.toastr.error('An error occured');
          this.bookform.enable();
          this.saving = false;
          this.failed = true;
          setTimeout(() => {
            this.failed = false;
          }, 2000);
        },
      )
    }
  }

  sponsorsaving: boolean = false;
  sponsorsaved: boolean = false;
  sponsorfailed: boolean = false;
  savesponsor() {
    if (this.sponsorform.valid) {
      this.sponsorform.get('Time')?.patchValue(this.date.toLocaleTimeString())
      this.sponsorform.disable();
      this.sponsorsaving = true;
      this.eventService.submitnews(this.sponsorform.value).subscribe(
        (response: any) => {
          this.toastr.success('We will get in touch shortly!');
          this.sponsorform.enable();
          this.sponsorsaving = false;
          this.sponsorsaved = true;
          setTimeout(() => {
            this.sponsorsaved = false;
          }, 2000);
        },
        (error: any) => {
          this.toastr.error('An error occured');
          this.sponsorform.enable();
          this.sponsorsaving = false;
          this.sponsorfailed = true;
          setTimeout(() => {
            this.sponsorfailed = false;
          }, 2000);
        },
      )
    }
  }
}
