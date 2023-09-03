import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  currentDate: Date = new Date();

  Form = new FormGroup({
    Email: new FormControl('', [Validators.required, Validators.email]),
    Date: new FormControl( this.currentDate, [Validators.required]),
  });

  constructor(
    public eventService: EventsService,
    public toastr: ToastrService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
  }

  submitting: boolean = false;
  submitForm() {
    if (this.Form.valid) {
      this.submitting = true;
      this.http.post('https://api.apispreadsheets.com/data/iznXuf6JfcjxUsAE/',this.Form.value).subscribe((res: any) => {
        this.toastr.success('Thank you for subscribing to our newsletter!', 'Success!');
        this.submitting = false;
      }, (err: any) => {
        this.toastr.error('Something went wrong, please try again later!', 'Error!');
        this.submitting = false;
      });
    }
  }

}
