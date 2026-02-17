import { Routes } from '@angular/router';
import { Layout } from './layout/layout';

export const routes: Routes = [
	{
		path: '',
		component: Layout,
		children: [
			{
				path: 'dashboard',
				loadComponent: () => import('./features/dashboard/dashboard').then(m => m.Dashboard)
			},
			{
				path: 'customers',
				loadComponent: () => import('./features/customers/customers').then(m => m.Customers)
			},
			{
				path: 'customers/:id',
				loadComponent: () => import('./features/customers/customer-details/customer-details').then(m => m.CustomerDetails)
			},
			{
				path: '',
				redirectTo: 'dashboard',
				pathMatch: 'full'
			}
		]

	},

];
