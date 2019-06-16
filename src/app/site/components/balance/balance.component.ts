import { Component, OnInit } from '@angular/core';
import { BalanceService } from './../../services/balance.service'
import { DatePipe } from '@angular/common';
import { DataService } from './../../services/data.service'

@Component({
  selector: 'ngx-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})

export class BalanceComponent implements OnInit {
  user: any;
  balance: number = 0;
  currentBalance: number = 0;
  loaded: boolean = false;
  responseMessage: object = { message: "", status: "false" };

  constructor(
    private datePipe: DatePipe,
    private balanceService: BalanceService,
    private getData: DataService
  ) { }

  ngOnInit() {
    this.getData.currentUser.subscribe(
      user => {
        this.user = user;
        if (user != null)
          this.balanceService.getBalance(this.user).subscribe(
            data => this.currentBalance = data.balance);
      })
  }

  onChange() {
    if (this.balance == null)
      this.balance = 0;
  }

  onSubmit() {
    // Get modified date of client side
    this.user.modified = this.datePipe.transform(new Date(), "yyyy-M-dd hh:mm:ss")
    // Added new balance with sum of old once
    let balance = Number(this.balance) + Number(this.currentBalance);

    // Subscribe observable in balance service
    this.balanceService.addBalance(this.user, balance).subscribe(res => { });
    this.balance = 0;
    this.ngOnInit();
  }

}
