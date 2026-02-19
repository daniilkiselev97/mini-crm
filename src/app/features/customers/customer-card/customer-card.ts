import { Component, computed, effect, inject, input, linkedSignal } from '@angular/core';
import { CustomersStore } from '../store/customers.store';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-card',
  imports: [ReactiveFormsModule],
  templateUrl: './customer-card.html',
  styleUrl: './customer-card.css',
})
export class CustomerCard {
  private store = inject(CustomersStore)
  private router = inject(Router)

  customerId = input<string>('')


  customer = computed(() => {
    return this.store.customers().find(c => c.id === this.customerId())
  })

  nameValid = computed(() => {
    return !!this.editableCustomer()?.name.trim()
  })

  emailValid = computed(() => {
    const email = this.editableCustomer()?.email ?? ''
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  })

  isDirty = computed(() => {
    const original = this.customer()
    const edited = this.editableCustomer()

    if (!original || !edited) return false

    return (
      original.name !== edited.name || original.email !== edited.email
    )
  })

  canSave = computed(() => this.isDirty() && this.formValid())

  formValid = computed(() => this.nameValid() && this.emailValid())

  editableCustomer = linkedSignal({
    source: this.customer,
    computation: (customer) =>
      customer ? { ...customer } : null
  })


  constructor() {
    effect(() => {
      console.log('Editing customer:', this.editableCustomer())
      const c = this.customer()
      if (!c) return

    })
  }

  save(e: Event) {
    e.preventDefault()
    const updated = this.editableCustomer()
    if (!updated || !this.canSave()) return
    this.store.updateCustomer(updated)
    this.router.navigate(['/'])
  }

  updateName(event: Event) {
    const name = (event.target as HTMLInputElement).value
    this.editableCustomer.update(v => v ? { ...v, name } : v)
  }

  updateEmail(event: Event) {
    const email = (event.target as HTMLInputElement).value
    this.editableCustomer.update(v => v ? { ...v, email } : v)
  }
}
