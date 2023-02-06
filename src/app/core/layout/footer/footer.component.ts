import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(
    public eventService: EventsService,
    public toastr: ToastrService
  ) { }
  date: Date = new Date();
  newsletterform: FormGroup = new FormGroup({
    Email: new FormControl(null, [Validators.email, Validators.required]),
    Time: new FormControl(null)
  });
  saving: boolean = false;
  saved: boolean = false;
  failed: boolean = false;

  ngOnInit(): void {
  }

  save() {
    if (this.newsletterform.valid) {
      this.newsletterform.get('Time')?.patchValue(this.date.toLocaleTimeString())
      this.newsletterform.disable();
      this.saving = true;
      this.eventService.submitnews(this.newsletterform.value).subscribe({
        next: (value) => {
          this.toastr.success('Thans for subscribing!');
          this.newsletterform.enable();
          this.saving = false;
          this.saved = true;
          setTimeout(() => {
            this.saved = false;
          }, 2000);
        },
        error: (err) => {
          this.toastr.error('An error occured');
          this.newsletterform.enable();
          this.saving = false;
          this.failed = true;
          setTimeout(() => {
            this.failed = false;
          }, 2000);
        },
      })
    }
  }

}
