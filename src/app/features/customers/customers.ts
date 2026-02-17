import { Component, inject } from '@angular/core';
import { CustomersStore } from './store/customers.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customers',
  imports: [CommonModule],
  templateUrl: './customers.html',
  styleUrl: './customers.css',
})
export class Customers {
  store = inject(CustomersStore)
}
