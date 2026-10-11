import { Locator, Page } from '@playwright/test';
import { CustomerDetails } from '@/models/customer-details';

type CustomerField = keyof CustomerDetails;
type FieldType = 'input' | 'select';
type FieldData = { class: string; type: FieldType; };

const FIELD_DATA: Record<CustomerField, FieldData> = {
    taxId: { class: 'tax_id', type: 'input' },
    company: { class: 'company', type: 'input' },
    firstName: { class: 'firstname', type: 'input' },
    lastName: { class: 'lastname', type: 'input' },
    address1: { class: 'address1', type: 'input' },
    address2: { class: 'address2', type: 'input' },
    postcode: { class: 'postcode', type: 'input' },
    city: { class: 'city', type: 'input' },
    country: { class: 'country_code', type: 'select' },
    zone: { class: 'zone_code', type: 'select' },
    email: { class: 'email', type: 'input' },
    phone: { class: 'phone', type: 'input' }
};

export class CustomerDetailsForm {
    private readonly root: Locator;

    constructor(page: Page) {
        this.root = page.locator('.billing-address');
    }

    async getDetails(): Promise<CustomerDetails> {
        const fields = Object.keys(FIELD_DATA) as CustomerField[];
        const entries = await Promise.all(fields.map(async field => [field, await this.getFieldValue(field)] as const));
        return Object.fromEntries(entries) as CustomerDetails;
    }

    private getField(field: CustomerField): Locator {
        return this.root.locator(`[name="${FIELD_DATA[field].class}"]`);
    }

    private async getFieldValue(field: CustomerField): Promise<string> {
        const element = this.getField(field);
        return FIELD_DATA[field].type === 'select'
            ? (await element.locator('option:checked').innerText()).trim()
            : element.inputValue();
    }
}