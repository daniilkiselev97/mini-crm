import { Component, computed, inject, input } from '@angular/core';
import { CustomersStore } from '../store/customers.store';

@Component({
  selector: 'app-customer-card',
  imports: [],
  templateUrl: './customer-card.html',
  styleUrl: './customer-card.css',
})
export class CustomerCard {
  private store = inject(CustomersStore)

  customerId = input<string>('')

  customer = computed(() => {
    return this.store.customers().find(c => c.id === this.customerId())
  })
}
