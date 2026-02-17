import { computed, Injectable, signal } from '@angular/core';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomersStore {
  private _customers = signal<Customer[]>([
   {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      company: 'Acme Inc.',
      status: 'active',
      revenue: 12000
    },
    {
      id: '2',
      name: 'Anna Smith',
      email: 'anna@example.com',
      company: 'Beta LLC',
      status: 'inactive',
      revenue: 5000
    }
  ])

  private _selectedCustomerId = signal<string | null>(null)

  customers = this._customers.asReadonly()

  selectedCustomerId = this._selectedCustomerId.asReadonly()

  selectedCustomer = computed(() => {
    return this._customers().find(c => c.id === this._selectedCustomerId())
  })

  activeCustomersCount = computed(() => {
    return this._customers().filter(c => c.status === 'active').length
  })

  totalRevenue = computed(() => {
    return this._customers().reduce((sum, c) => sum + c.revenue, 0)
  })

  selectCustomer(id: string) {
    this._selectedCustomerId.set(id)
  }

  addCustomer(customer: Customer) {
    this._customers.update(list => [...list, customer])
  }

}
