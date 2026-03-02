import { Component, computed, inject } from '@angular/core';
import { CustomersStore } from '../customers/store/customers.store';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-overview',
  imports: [BaseChartDirective],
  templateUrl: './overview.html',
  styleUrl: './overview.css',
})
export class Overview {
  private store = inject(CustomersStore)

  customers = this.store.customers

  barChartData = computed<ChartConfiguration<'bar'>['data']>(() => ({
    labels: this.customers().map(c => c.name),
    datasets: [
      {
        data: this.customers().map(c => c.revenue),
        label: 'Revenue'
      }
    ]
  }))

  barChartType: ChartType = 'bar'

  pieChartData = computed<ChartConfiguration<'pie'>['data']>(() => {
    const active = this.customers().filter(c => c.status == 'active').length
    const inactive = this.customers().length - active

    return {
      labels: ['Active', 'Inactive'],
      datasets: [
        {
          data: [active, inactive]
        }
      ]
    }
  })

  pieChartType : ChartType = 'pie'



}
