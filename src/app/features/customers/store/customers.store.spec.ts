import { TestBed } from '@angular/core/testing';
import { CustomersStore } from './customers.store';
describe('CustomersStore', () => {
	let store: CustomersStore

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [CustomersStore]
		})
		store = TestBed.inject(CustomersStore)
		store.clear()
	});

	it('should calculate total revenue correctle', () => {
		store.addCustomer({
			id: '1',
			name: 'John',
			company: 'ACME',
			revenue: 100,
			status: 'active',
			email: 'john@example.com'
		});
		store.addCustomer({
			id: '2',
			name: 'Jane',
			company: 'Beta',
			revenue: 200,
			status: 'inactive',
			email: 'anna@example.com'
		});
		store.addCustomer({
			id: '3',
			name: 'Sarah Johnson',
			email: 'sarah.j@email.com',
			company: 'Alpha',
			status: 'active',
			revenue: 0
		},)

		expect(store.totalRevenue()).toBe(300)
	})

	it('should count active correctly', () => {
		store.addCustomer({
			id: '1',
			name: 'John',
			company: 'ACME',
			revenue: 100,
			status: 'active',
			email: 'john@example.com'
		});
		store.addCustomer({
			id: '2',
			name: 'Jane',
			company: 'Beta',
			revenue: 200,
			status: 'active',
			email: 'anna@example.com'
		});
		expect(store.activeCustomersCount()).toBe(2)
	})

	it('should filter customers by name or email', () => {
		store.addCustomer({
			id: '1',
			name: 'John Doe',
			email: 'john@acme.com',
			company: 'ACME',
			revenue: 100,
			status: 'active'
		});

		store.addCustomer({
			id: '2',
			name: 'Jane Smith',
			email: 'jane@beta.com',
			company: 'Beta',
			revenue: 200,
			status: 'inactive'
		});

		store.addCustomer({
			id: '3',
			name: 'Bob Johnson',
			email: 'bob@alpha.com',
			company: 'Alpha',
			revenue: 150,
			status: 'active'
		});

		expect(store.filteredCustomers().length).toBe(3)

		store.setFilter('Jane')
		expect(store.filteredCustomers().length).toBe(1)
		expect(store.filteredCustomers()[0].name).toBe('Jane Smith')

		store.setFilter('bob@alpha.com')
		expect(store.filteredCustomers().length).toBe(1)
		expect(store.filteredCustomers()[0].name).toBe('Bob Johnson')

		store.setFilter('XYZ')
		expect(store.filteredCustomers().length).toBe(0)
	})

	it('should return selected customer')
})
