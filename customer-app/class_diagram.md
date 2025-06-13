```mermaid
classDiagram


class CustomerRegistration{
            
            +RegisterCustomer() boolean
        }
class Customer{
            +Name: string
+Email: string
+MobileNumber: string
+Address: string
+Password: string
            +Create() Customer$
        }
class DataAccessLayer{
            +Customers: Customer[]
            +SaveCustomer() boolean
        }
class DomainModule{
            
            
        }
class DomainService{
            
            
        }
class EmailService{
            
            +SendRegistrationEmail() boolean
        }
class Validator{
            
            +ValidateCustomer() boolean
        }

```