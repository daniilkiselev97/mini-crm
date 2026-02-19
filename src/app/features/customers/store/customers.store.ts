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

  private _filter = signal<string>('')


  customers = this._customers.asReadonly()

  filter = this._filter.asReadonly()



  activeCustomersCount = computed(() => {
    return this._customers().filter(c => c.status === 'active').length
  })

  totalRevenue = computed(() => {
    return this._customers().reduce((sum, c) => sum + c.revenue, 0)
  })

  filteredCustomers = computed(() => {
    const filterValue = this._filter().toLowerCase()
    return this._customers().filter(c => c.name.toLowerCase().includes(filterValue) || c.email.toLowerCase().includes(filterValue))
  })

  setFilter(value: string) {
    this._filter.set(value)
  }


  addCustomer(customer: Customer) {
    this._customers.update(list => [...list, customer])
  }

  updateCustomer(updatedCustomer: Customer) {
    this._customers.update(list => list.map(c => c.id === updatedCustomer.id ? updatedCustomer : c))
  }

}
