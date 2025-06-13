export class Customer {
    public Name: string;
    public Email: string;
    public MobileNumber: string;
    public Address: string;
    public Password: string;
    public static Create(name: string, email: string, mobileNumber: string, address: string, password: string): Customer
    {
        const c = new Customer();
        c.Name = name;
        c.Email = email; 
        c.MobileNumber = mobileNumber; 
        c.Address = address; 
        c.Password = password;
        return c;
    }
}