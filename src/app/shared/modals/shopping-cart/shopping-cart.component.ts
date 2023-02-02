import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/core/models/products.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

interface Order {
  event: Event;
  order: {
    reg_ticket: {
      order_amount: number;
      order_total: number;
    },
    vip_ticket: {
      order_amount: number;
      order_total: number;
    },
    sub_total: number;
    grand_total: number;
  }
}

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  event!: Event;
  order_summary: boolean = false;

  storage: Storage = sessionStorage;
  Order!: Order;

  reg_order_amount: number = 0;
  reg_order_total: number = 0;

  vip_order_amount: number = 0;
  vip_order_total: number = 0;

  order_sub_total: number = 0;
  order_grand_total: number = 0;

  checking_out: boolean = false;

  constructor(
    public activeModal: NgbActiveModal
  ) {

  }

  form!: FormGroup;
  formInit: boolean = false;

  ngOnInit(): void {
    console.log(this.event)
    this.Order = JSON.parse(this.storage.getItem(this.event._id) as string);
    if (this.Order) {
      this.reg_order_amount = this.Order.order.reg_ticket.order_amount;
      this.reg_order_total = this.Order.order.reg_ticket.order_total;

      this.vip_order_amount = this.Order.order.vip_ticket.order_total;
      this.vip_order_total = this.Order.order.vip_ticket.order_total;

      this.order_sub_total = this.Order.order.sub_total;
      this.order_grand_total = this.Order.order.grand_total;
      this.sumTotal();
      this.setForm();
    } else {
      this.setForm();
    }
  }

  setForm() {
    this.form = new FormGroup({
      reg: new FormControl(this.reg_order_amount, Validators.required),
      vip: new FormControl(this.vip_order_amount, Validators.required)
    });
    this.formInit = true;
  }

  chevToggle() {
    if (this.order_summary) this.order_summary = false
    else this.order_summary = true;
  }

  addItem(event: HTMLInputElement, type: string) {
    let amount: number = event.valueAsNumber;

    if (type === 'reg') {
      this.reg_order_amount = amount;
      this.reg_order_total = this.reg_order_amount * this.event.price;
      this.sumTotal();
    } else if (type === 'vip' && this.event.vip_price) {
      this.vip_order_amount = amount;
      this.vip_order_total = this.vip_order_amount * this.event?.vip_price;
      this.sumTotal();
    }
  }

  sumTotal() {
    let total = this.reg_order_total + this.vip_order_total;
    this.order_sub_total = total;
    this.order_grand_total = total;
    this.saveCartSession();
  }

  saveCartSession() {
    const session: Order = {
      event: this.event,
      order: {
        reg_ticket: {
          order_amount: this.reg_order_amount,
          order_total: this.reg_order_total
        },
        vip_ticket: {
          order_amount: this.vip_order_amount,
          order_total: this.vip_order_total
        },
        sub_total: this.order_sub_total,
        grand_total: this.order_grand_total
      }
    };
    this.storage.setItem(this.event._id, JSON.stringify(session));
  }

  checkout() {
    if (this.form.valid && this.order_grand_total !== 0) {
      this.checking_out = true;

    }
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
