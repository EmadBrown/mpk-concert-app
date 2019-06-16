import { Component, OnInit } from '@angular/core';
import { Visitor } from '../../Interface/visitor';
import { BuyTicketService } from '../../services/buy-ticket.service'
import { DatePipe } from '@angular/common';
import { DataService } from './../../services/data.service';
import { Router } from '@angular/router';

export class Ticket {
  ticketNum: number;
  checked: boolean;
  disabled: boolean;
}

@Component({
  selector: 'ngx-buy-tickets',
  templateUrl: './buy-tickets.component.html',
  styleUrls: ['./buy-tickets.component.scss']
})
export class BuyTicketsComponent implements OnInit {

  totalTicket: number = 0;
  ticketPrice: number = 50;
  withSpot: boolean = false;
  totalspot: number = 0;
  spotPrice: number = 20;
  tickets: Ticket[] = [];
  arrayOfAge: number[] = [];
  join = false;
  agree = false;
  visitor: Visitor = {
    id: null,
    firstName: [],
    lastName: [],
    email: null,
    spot: [],
    balance: null,
    comment: null,
    inEvent: 0,
    inCamping: 0,
    createdAt: null,
    modified: null,
    role: 'user'
  }
  
  loaded: boolean = false;
  totalChecked: number = 0;
  responseMessage: object = { message: "", status: "false" };

  constructor(
    private ticketService: BuyTicketService,
    private datePipe: DatePipe,
    private getData: DataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getData.currentUser.subscribe(user => {
      if (user != null && user.role == 'admin')
        this.router.navigateByUrl('pages'); // Your redirection goes here
      else if (user != null && user.role == 'user')
        this.router.navigateByUrl('home/balance'); // Your redirection goes here
      else
        this.router.navigateByUrl('home'); // Your redirection goes here
    });
  }

  onChangeTickets() {

    // initialize tickets array in case of modifying
    this.tickets = [];
    this.visitor.spot = [];
    this.visitor.firstName = [];
    this.visitor.lastName = [];

    // initialize tickets array in case of modifying
    this.totalspot = this.totalspot > this.totalTicket ? this.totalTicket : this.totalspot;

    for (let i = 0; i < this.totalTicket; i++) {
      this.tickets.push({ 'ticketNum': i, 'checked': false, 'disabled': true });
      this.visitor.spot.push(false);
      this.visitor.firstName.push(null);
      this.visitor.lastName.push(null);
    }
  }

  onChangeSpot() {
    this.onChangeTickets();
    if (this.tickets.length == this.totalspot) {
      this.visitor.spot = [];
      this.tickets.map(ticket => { ticket.checked = true; ticket.disabled = true; this.visitor.spot.push(true); })
    }
    else {
      for (let i = 0; i < this.totalspot; i++) {
        let ticket = this.tickets.find(ticket => ticket.ticketNum == i);
        if (ticket != null) {
          this.visitor.spot[i] = true;
          ticket.checked = true;
          ticket.disabled = false;
        } else {
          ticket.checked = false;
          ticket.disabled = true;
        }
      }
    }
    this.checkedSpot();
  }

  onChangeSpotSwitcher(newValue, ticketNum) {
    let ticket = this.tickets.find(ticket => ticketNum == ticket.ticketNum);
    ticket.checked = !ticket.checked;
    this.visitor.spot[ticketNum] = !this.visitor.spot[ticketNum];
    this.checkedSpot();
    if (newValue) {
      this.tickets.map(ticket => { if (!ticket.checked && this.totalspot == this.totalChecked) ticket.disabled = true; })
    }
    else {
      this.tickets.map(ticket => ticket.disabled = false)
    }
  }

  checkedSpot() {
    this.totalChecked = 0;
    this.tickets.map(ticket => { if (ticket.checked) this.totalChecked++; })
  }

  onSubmit() {
    this.visitor.createdAt = this.datePipe.transform(new Date(), "yyyy-M-dd hh:mm:ss") // "2019-05-22:02:08"
    this.ticketService.createCustomer(this.visitor).subscribe((res) => {
      this.responseMessage = res;
    });
  }

  reset() {
    this.totalTicket = 0;
    this.totalspot = 0;
  }
}


