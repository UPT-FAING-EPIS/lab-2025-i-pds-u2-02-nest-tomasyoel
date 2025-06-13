import { Test, TestingModule } from '@nestjs/testing';
import { DomainService } from './domain.service';
import { Customer } from './customer';
import { CustomerRegistration } from './customer-registration';
import { DataAccessLayer } from './data-access-layer';
import { EmailService } from './email-service';
import { Validator } from './validator';

describe('DomainService', () => {
  let service: DomainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DomainService],
    }).compile();

    service = module.get<DomainService>(DomainService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

describe('GivenANewCustomer_WhenRegister_ThenIsValidatedSavedEmailedSuccessfully', () => {
  let customer: Customer;
  let validator: Validator;
  let dataAccessLayer: DataAccessLayer;
  let saved: boolean;
  let email: EmailService;

  beforeEach(async () => {
    validator = new Validator();
    dataAccessLayer = new DataAccessLayer();
    email = new EmailService();
    customer = Customer.Create(
      "Jose Cuadros","p.cuadros@gmail.com","1234567890","Tacnamandapio","str0ng.pa55");
    saved =  dataAccessLayer.SaveCustomer(customer);
  });

  it('Customer should be defined', () => {
    expect(customer).toBeDefined();
  });

  it('Customer should be valid', () => {
    expect(validator.ValidateCustomer(customer)).toBeTruthy();
  });

  it('Customer should be saved', () => {
    expect(saved).toBeTruthy();
  });

  it('Customer should be add', () => {
    expect(dataAccessLayer.Customers.length > 0).toBeTruthy();
  });

  it('Customer should be notified', () => {
    expect(email.SendRegistrationEmail(customer)).toBeTruthy();
  });
});

describe('GivenANewCustomer_WhenRegister_ThenIsRegisteredSuccessfully', () => {
  let customer: Customer;
  let registration: CustomerRegistration;

  beforeEach(async () => {
    registration = new CustomerRegistration();
    customer = Customer.Create(
      "Jose Cuadros","p.cuadros@gmail.com","1234567890","Tacnamandapio","str0ng.pa55");
  });

  it('Customer should be defined', () => {
    expect(customer).toBeDefined();
  });

  it('Customer should be registered', () => {
    expect(registration.RegisterCustomer(customer)).toBeTruthy();
  });
});
       