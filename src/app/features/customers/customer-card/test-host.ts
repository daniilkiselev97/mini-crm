import { Component } from '@angular/core';
import { CustomerCard } from "./customer-card";

@Component({
  selector: 'app-test-host',
  imports: [CustomerCard],
  template: `<app-customer-card [customerId]='customerId'></app-customer-card>`,
})
export class TestHost {
  customerId = '1'

}
