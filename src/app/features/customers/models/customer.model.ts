export interface Customer {
	id: string,
	name: string,
	email: string,
	company: string,
	status: 'active' | 'inactive',
	revenue: number
}