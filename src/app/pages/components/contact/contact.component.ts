import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {


  bookform: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.email, Validators.required]),
    party: new FormControl(null, Validators.required),
    people: new FormControl(null, Validators.required)
  });
  saving: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
