import { Component, inject } from '@angular/core';
import { CustomersStore } from './store/customers.store';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-customers',
  imports: [CommonModule, RouterLink],
  templateUrl: './customers.html',
  styleUrl: './customers.css',
})
export class Customers {
  store = inject(CustomersStore)
}
