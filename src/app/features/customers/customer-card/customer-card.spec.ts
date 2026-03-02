import { TestBed } from "@angular/core/testing"
import { CustomersStore } from "../store/customers.store"
import { CustomerCard } from "./customer-card"
import { TestHost } from "./test-host"

describe('Customer card', () => {
	let store: CustomersStore
	let card: CustomerCard


	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [CustomersStore]
		})

		store = TestBed.inject(CustomersStore)

		store.clear()
		store.addCustomer({
			id: '1',
			name: 'John Doe',
			email: 'john@example.com',
			company: 'ACME',
			status: 'active',
			revenue: 1000
		});

		const fixture = TestBed.createComponent(TestHost)
		fixture.detectChanges()
		card = fixture.debugElement.children[0].componentInstance as CustomerCard
	});

	it('should have correct customer for input signal', () => {
		expect(card.customer()?.name).toBe('John Doe')
	})

	it('should update name vie updateName()', () => {
		const event = { target: { value: "Jane Doe" } } as unknown as Event
		card.updateName(event)
		expect(card.editableCustomer()?.name).toBe("Jane Doe")
	});

	it('should update emeil vie updateEmail()', () => {
		const event = { target: { value: "jane@example.com" } } as unknown as Event
		card.updateEmail(event)
		expect(card.editableCustomer()?.email).toBe("jane@example.com")
	})

	it('canSave should be true if edited and valid', () => {
		expect(card.canSave()).toBe(false)
		const event = { target: { value: "Jane Doe" } } as unknown as Event
		card.updateName(event)
		expect(card.canSave()).toBe(true)

	})
})