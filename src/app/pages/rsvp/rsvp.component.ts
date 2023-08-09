import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import * as e from 'express';
import { ToastrService } from 'ngx-toastr';
import { RsvpService } from 'src/app/core/services/rsvp.service';

interface Step {
  label: string;
  no: number;
  active: boolean;
  icon?: string;
}

@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.scss']
})
export class RsvpComponent implements OnInit, AfterViewChecked {

  address: string = 'Railroom, Telliskivi 59a.'

  steps: Step[] = [
    { label: 'RSVP', no: 0, active: true },
    { label: 'Full name', no: 1, active: false },
    { label: 'Email', no: 2, active: false },
    // { label: 'Phone', no: 3, active: false },
    { label: 'Are you attending?', no: 3, active: false },
    { label: this.address, no: 4, active: false },
    { label: 'Bringing guests?', no: 5, active: false },
    { label: 'Plus one or two?', no: 6, active: false },
    { label: 'Do you drink?', no: 7, active: false },
    { label: 'Do you smoke?', no: 8, active: false },
    { label: 'That\'s too bad', no: 9, active: false },
    { label: 'Thank you', no: 10, active: false }
  ]

  activeStep: Step = this.steps[0];
  form: FormGroup = new FormGroup({
    firstname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    // phone: new FormControl('', [Validators.required, Validators.pattern(/^\+372\s\d{3}\s\d{3}\s\d{4}$/)]),
    attending: new FormControl('', [Validators.required]),
    guests: new FormControl('', [Validators.required]),
    plusOneOrTwo: new FormControl(0, [Validators.required]),
    drink: new FormControl('', [Validators.required]),
    smoke: new FormControl('', [Validators.required])
  });

  //Estonia phone mask
  // phoneMask = ['+', '3', '7', '2', ' ', /[1-9]/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];

  @ViewChild('main') main!: ElementRef<HTMLElement>;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public toast: ToastrService,
    private rsvpService: RsvpService,
    public titleService: Title
  ) {
    this.titleService.setTitle('TILT Empire presents: Eat-a-thon');
    toast.toastrConfig.preventDuplicates = true;  
    this.route.params.subscribe(params => {
      //get from session storage
      const rsvp: any = JSON.parse(sessionStorage.getItem('rsvp')!),
            ActiveStep: Step = JSON.parse(sessionStorage.getItem('activeStep')!);
      // rsvp.attending = '';
      // rsvp.guests = '';
      // rsvp.plusOneOrTwo = 0;
      if (rsvp) this.form.patchValue(rsvp);
      if (ActiveStep) this.activeStep = ActiveStep;

      // if (ActiveStep && ) {
      //   const index = this.steps.findIndex(step => step.no === ActiveStep.no);
      //   this.steps[index].active = true;
      //   this.activeStep = this.steps[index];
      // } else {
      //   this.activeStep = this.steps[0];
      // }
      
      if (params.activeStep && rsvp) {
        const index = this.steps.findIndex(step => step.no === +params.activeStep);
        this.steps[index].active = true;
        // console.log('params, rsvp')
        this.activeStep = this.steps[index];
      } else if (!params.activeStep && !rsvp.firstname && !rsvp.lastname) {
        this.activeStep = this.steps[0];
        // console.log('no params, no rsvp')
      }
    });
  }

  ngAfterViewChecked(): void {
    if (this.main) {
      this.main.nativeElement.scrollIntoView();
      // console.log('scrolling', this.main)
    }
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(value => {
      //save to session storage
      sessionStorage.setItem('rsvp', JSON.stringify(value));
      //set active step as 9 if attending is false
      if (value.attending === false && this.activeStep.no === 3) {
        this.form.get('guests')?.patchValue(false);
        this.form.get('plusOneOrTwo')?.patchValue(0);
        this.form.get('drink')?.patchValue(false);
        this.form.get('smoke')?.patchValue(false);
        setTimeout(() => {
          const index = this.steps.findIndex(step => step.no === 9);
          this.steps[index].active = true;
          this.activeStep = this.steps[index];
        }, 2500);
      }
      if (value.guests === false) {
        this.form.get('plusOneOrTwo')?.setValue(0);
      }
    });
  }

  //go to next step and add active step to route params
  nextStep(no: number) {
    const index = this.steps.findIndex(step => step.no === no);
    this.steps[index].active = true;
    this.activeStep = this.steps[index];
    this.router.navigate(['rsvp', {
      activeStep: this.activeStep.no
    }]);
    sessionStorage.setItem('activeStep', JSON.stringify(this.activeStep));
  }

  //go to previous step and add active step to route params
  previousStep(no: number) {
    if (no !== 0) {
      const index = this.steps.findIndex(step => step.no === no);
      this.steps[index].active = false;
      this.activeStep = this.steps[index];
      this.router.navigate(['rsvp', {
        activeStep: this.activeStep.no
      }]);
    } else {
      this.router.navigate(['rsvp']);
    }
    sessionStorage.setItem('activeStep', JSON.stringify(this.activeStep));
  }

  confirm(confirm: boolean, type: string, value?: string | number) {
    if (confirm) {
      if (!value) this.form.get(type)?.setValue(true);
      else this.form.get(type)?.setValue(value);
    } else {
      if (!value) this.form.get(type)?.setValue(false);
      else this.form.get(type)?.setValue(value);
    }

    sessionStorage.setItem('rsvp', JSON.stringify(this.form.value));
    // console.log(this.form.value)
  }

  restart() {
    sessionStorage.clear();
    this.form.reset();
    this.router.navigate(['rsvp']);
    this.activeStep = this.steps[0];
  }

  isSaving: boolean = false;
  saveStatus: string = '';

  timeleft: number = 10;
  starttimer: 'saved' | null = null;

  countdown() {
    console.log('countdown started')
    this.timeleft--;    
    console.log(this.timeleft)
    if (this.timeleft > 0) {
      setTimeout(() => this.countdown(), 1000);
    } else if (this.timeleft === 0) {
      this.goto('https://buy.stripe.com/14kaG13xzfQ6dpK000');
    }
  };

  save(bypass?: boolean) {
    this.saveStatus = '';
    if (this.form.valid || bypass) {
      this.isSaving = true;
      this.form.disable();
      //convert all values to string into payload
      let payload = {
        firstname: this.form.value.firstname.toString(),
        lastname: this.form.value.lastname.toString(),
        email: this.form.value.email.toString(),
        // phone: this.form.value.phone.toString(),
        attending: this.form.value.attending.toString(),
        guests: this.form.value.guests.toString(),
        plusOneOrTwo: this.form.value.plusOneOrTwo.toString(),
        drink: this.form.value.drink.toString(),
        smoke: this.form.value.smoke.toString()
      }

      this.rsvpService.saveRsvp(payload).subscribe(res => {
        this.isSaving = false;
        this.form.enable();
        this.starttimer = 'saved';

        setTimeout(() => this.countdown(), 1000);

        setTimeout(() => {
          this.saveStatus = '';
        }, 2000);
        this.nextStep(10);
    });
    }
  }

  goto(link: string) {
    window.location.href = link;
  }

  copied() {
    this.toast.info('Address copied!')
  }
}
