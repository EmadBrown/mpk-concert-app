import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-content',
  template: `
  <div class="modal-header">
  <h4 class="modal-title">Terms & conditions</h4>
  <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
  </button>
</div>
<div class="modal-body">
  <ol>
      <li>
          <p>
              People under 18 years old are not allowed to participate in the event. Please, provide the employee at
              the entrance with your ID for an age check!
          </p>
      </li>

      <li>
          <p>
              Visitors cannot buy any items (food, drinks, souvenirs, etc.) with cash. Every visitor must use their
              event
              account to buy and loan items at the event. (“How to use my event account?” – Instructions provided in
              My Account page)
          </p>
      </li>
      <li>
          <p>
              For each loan item a deposit of 50% of the price of the item is taken. In case of damaged or lost
              products,
              we do not return the deposit.
          </p>
      </li>
      <li>
          <p>
              No refund if for any reason a person is not available to visit the event.</p>
      </li>
      <li>
          <p>
              Buying a ticket or reserving a camping spot for a day is not possible.
          </p>
      </li>
      <li>
          <p>
              People are allowed to leave during the event and return later through special gates. Ask our employees
              for
              more information.
          </p>
      </li>
  </ol>
</div>
<div class="modal-footer">
  <button type="button" class="btn btn-outline-danger" (click)="activeModal.close('Close click')">Close</button>
</div>
  `
})
export class NgbdModalContent {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'ngbd-modal-component',
  templateUrl: './modal-component.html'
})
export class NgbdModalComponent {
  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = 'World';
  }
}
