import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { CustomerCard } from '../customer-card/customer-card';

@Component({
  selector: 'app-customer-details',
  imports: [CommonModule, CustomerCard],
  templateUrl: './customer-details.html',
  styleUrl: './customer-details.css',
})
export class CustomerDetails {
  private route = inject(ActivatedRoute)

  idParamMap = toSignal(
    this.route.paramMap,
    {
      initialValue: this.route.snapshot.paramMap
    }
  )
  id = computed(() => this.idParamMap().get('id') ?? '')

}
