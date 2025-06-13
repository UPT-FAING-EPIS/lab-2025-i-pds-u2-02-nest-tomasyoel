import { Customer } from "./customer";

export class Validator {
    public ValidateCustomer(customer: Customer): boolean
    {
        //Need to Validate the Customer Object
        if (typeof customer.Name === 'string' && customer.Name.trim().length === 0) throw new Error("Name can't be null or empty");
        if (typeof customer.Email === 'string' && customer.Email.trim().length === 0) throw new Error("Email can't be null or empty");
        if (typeof customer.MobileNumber === 'string' && customer.MobileNumber.trim().length === 0) throw new Error("MobileNumber can't be null or empty");
        if (typeof customer.Address === 'string' && customer.Address.trim().length === 0) throw new Error("Address can't be null or empty");
        return true;
    }    
}