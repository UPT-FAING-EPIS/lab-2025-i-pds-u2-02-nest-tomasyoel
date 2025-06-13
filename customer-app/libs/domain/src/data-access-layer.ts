import { Customer } from "./customer";

export class DataAccessLayer {
    public Customers: Array<Customer>;
    constructor() {
        this.Customers = [];
    }
    public SaveCustomer(customer: Customer): boolean
    {
        this.Customers.push(customer);
        return true;
    }           
}