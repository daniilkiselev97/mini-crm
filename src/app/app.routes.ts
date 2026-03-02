import { Routes } from '@angular/router';
import { Layout } from './layout/layout';

export const routes: Routes = [
	{
		path: '',
		component: Layout,
		children: [
			{
				path: 'customers',
				loadComponent: () => import('./features/customers/customers').then(m => m.Customers)
			},
			{
				path: 'customers/:id',
				loadComponent: () => import('./features/customers/customer-details/customer-details').then(m => m.CustomerDetails)
			},
			{
				path: 'overview',
				loadComponent: () => import('./features/overview/overview').then(m => m.Overview)

			},
			{
				path: '',
				redirectTo: 'customers',
				pathMatch: 'full'
			}
		]

	},

];
